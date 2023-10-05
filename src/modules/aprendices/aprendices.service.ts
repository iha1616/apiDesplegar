import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccesoEntity, AprendicesEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { TipoDocumentoService } from '../tipo-documento/tipo-documento.service';
import { RolesService } from '../roles/roles.service';
import { AccesoService } from '../acceso/acceso.service';
import { DtoAprendiz, UpdateAprendicesDto } from './dto/createDto';
import { plainToClass } from 'class-transformer';
import * as ExcelJS from 'exceljs';

import { FichasService } from '../fichas/fichas.service';
import CargaExcelDto from './dto/batchCargaExcelDto';



@Injectable()
export class AprendicesService {
   constructor(
      @InjectRepository(AprendicesEntity) private AprendizRepository: Repository<AprendicesEntity>,
      private accesoService: AccesoService,
      private fichaService : FichasService
   ) { }

   async createAprendiz(aprendiz: DtoAprendiz): Promise<AprendicesEntity> {
      const validateDocumento = await this.accesoService.getAccesoDocumento(aprendiz.documento)
      const emailFound = await this.AprendizRepository.findOne({
         where:{
            email : aprendiz.email
         }
      })

      if (emailFound) {
         throw "Correo ya registrado"
      }

      if (validateDocumento) {
         throw "Documento ya registrado"
      }

      const createAprendiz = this.AprendizRepository.create(plainToClass(AprendicesEntity, aprendiz))
      const saveAprendiz = await this.AprendizRepository.save(createAprendiz)

      if (!saveAprendiz) {
         throw "F, no se registró"
      }

      const accesoAprendiz = {
         documento: saveAprendiz.documento,
         password: String(saveAprendiz.documento),
         idUsuarioAprendiz: saveAprendiz.idAprendiz,
         tablaAcceso: 2
      }

      await this.accesoService.createAcceso(plainToClass(AccesoEntity, accesoAprendiz))
      return saveAprendiz
   }

   getAprendizAcceso(documento: number): Promise<AprendicesEntity> {
      return this.AprendizRepository.findOne({
         where: { documento },
         relations: ['tipoDocumentoAprendiz', 'rolAprendiz', 'fichaAprendiz.usuarioFichaDirector', 'fichaAprendiz.programaFicha', 'grupoAprendiz']
      })
   }


   async getAprendices() {
      return await this.AprendizRepository.find({
         relations: ['tipoDocumentoAprendiz', 'rolAprendiz', 'fichaAprendiz.usuarioFichaDirector', 'fichaAprendiz.programaFicha', 'grupoAprendiz', 'observacionesAprendiz', 'quejasAprendices', 'quejasAprendices.comiteQueja', 'planMejoramientoAprendices']
      })
   }

   async getAprendiz(id: number) {
      const aprendizFound = await this.AprendizRepository.findOne({
         where: {
            idAprendiz: id

         },
         relations: ['tipoDocumentoAprendiz', 'rolAprendiz', 'fichaAprendiz.usuarioFichaDirector', 'fichaAprendiz.programaFicha', 'grupoAprendiz', 'observacionesAprendiz', 'quejasAprendices', 'quejasAprendices.comiteQueja', 'planMejoramientoAprendices']
      });

      if (!aprendizFound) {
         return new HttpException('Aprendiz no encontrado', 404)
      }
      return aprendizFound;

   }

   getAprendicesGP(id: any): Promise<AprendicesEntity[]> {
      return this.AprendizRepository.find({
         where: { grupoAprendiz: { idGrupoProyecto: id } },
         relations: ['tipoDocumentoAprendiz', 'rolAprendiz', 'fichaAprendiz.usuarioFichaDirector', 'fichaAprendiz.programaFicha', 'grupoAprendiz']
      })
   }


   async updateAprendiz(idAprendiz: any, aprendiz: UpdateAprendicesDto) {
      const searchA = await this.AprendizRepository.findOne({
         where: { idAprendiz }
      })

      if (!searchA) {
         return new HttpException('Aprendiz no encontrado', 404)
      }

      const updateA = this.AprendizRepository.merge(searchA, plainToClass(AprendicesEntity, aprendiz));
      return this.AprendizRepository.save(updateA);
   }

   getAprendicesFicha(fichaAprendiz: any): Promise<AprendicesEntity[]> {
      return this.AprendizRepository.find({
         where: { fichaAprendiz: { codigoFicha: fichaAprendiz } },
         relations: ['tipoDocumentoAprendiz', 'rolAprendiz', 'fichaAprendiz.usuarioFichaDirector', 'fichaAprendiz.programaFicha', 'grupoAprendiz']
      })
   }

   async batchCargaExcel(datos: CargaExcelDto): Promise<any> {
      const tipoDocumentoEquivalencias = {
        "CC": 1,
        "TI": 2,
        "CE": 3,
        "Número ciego - SENA" : 4,
        "PASAPORTE": 5,
        "NIT" : 6,
        "PEP - RAMV" : 7,
        "PEP" : 8,
        "PPT" : 9
        
      };
    
      // Decifra B64 excel
      const buffer = Buffer.from(datos.data, 'base64');
    
      // Lee buffer stream (excel)
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);
      var estudiantesNoProcesados = [];
      
      for (const worksheet of workbook.worksheets) {
        // Resuelve la ficha
        const fichaId = String(worksheet.getRow(2).getCell(3).value).split('-')[0].trim();
        const ficha = await this.fichaService.getFicha(fichaId);
    
        // Si hay problemas con la ficha omite procesar esta sheet y continua con el resto
        if (ficha instanceof HttpException) {
          console.log("Problemas con la ficha...", ficha.cause);
          return;
        }
    
         // Procesa cada estudiante, inicia desde la row 6 que es donde empieza la lista de estudiantes, omite las filas vacías
         worksheet.eachRow({ includeEmpty: false }, async (row, rowIndex) => {
            // Omitir rows 
            if (rowIndex < 6) return;

           const documento = Number(row.getCell(2).value);
           const nombre= String(row.getCell(3).value);
           const apellidos = String(row.getCell(4).value);
            
           const email = String(row.getCell(6).value);
           const tipoDocumento = String(row.getCell(1).value);
           // Validar campos requeridos
        if (!tipoDocumento || !documento || !nombre || !apellidos || !email) {
           const error = "Alguno de los campos requeridos está vacío.";
           console.log(error);
           estudiantesNoProcesados.push({ aprendiz: documento, ficha: ficha.idFicha, causa: error });
          return ; // Salir del bucle actual
       }

       const emailFound = await this.AprendizRepository.findOne({
         where:{
            email
         }
         
      })

      if (emailFound) {
         const error = "Correo ya registrado"
         estudiantesNoProcesados.push({ aprendiz: documento, ficha: ficha.idFicha, causa: error });
          return ; // Salir del bucle actual
      }
         


            
            // Mapea estudiante en Dto ya existente
            const aprendiz: DtoAprendiz = {
               documento,
               nombre,
               apellidos,
               telefono: Number(row.getCell(5).value) || 0,
               email,
               fichaAprendiz: ficha.idFicha,
               rolAprendiz: 6,
               tipoDocumentoAprendiz: tipoDocumentoEquivalencias[tipoDocumento],
               estadoAprendiz: 1,
               grupoAprendiz: null

            };

            await this.createAprendiz(aprendiz).catch((error) => {
               console.log(error);
               estudiantesNoProcesados.push({ aprendiz: aprendiz.documento, ficha: ficha.idFicha, causa: error });
            });
        });
      };

      return { 
         estudiantesNoProcesados
      };
    }  
}