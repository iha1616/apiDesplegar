// import { Injectable } from '@nestjs/common';
// import { QuejasComiteEntity } from 'src/db/entities/quejas/quejas_comite.entity';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { plainToClass } from 'class-transformer';
// import { CreateQuejasDTo, UpdateQuejasDTO } from './dto/quejas.dto';

// @Injectable()
// export class QuejasService {
//    constructor(@InjectRepository(QuejasComiteEntity) private quejaRepository: Repository<QuejasComiteEntity>) { }

//    async createQueja(queja: CreateQuejasDTo) {
//       const newQueja = this.quejaRepository.create(plainToClass(QuejasComiteEntity, queja))
//       return await this.quejaRepository.save(newQueja)
//    }

//    getAllQuejas() {
//       return this.quejaRepository.find({
//          relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA", "observacionQueja"]
//       })
//    }

//    getQuejaInstructor(id: any): Promise<QuejasComiteEntity[]> {
//       return this.quejaRepository.find({
//          where: { usuarioQueja: { idUsuario: id } },
//          relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA", "observacionQueja"]
//       })
//    }

//    getQuejaPCA(id: any): Promise<QuejasComiteEntity[]> {
//       return this.quejaRepository.find({
//          where: { competenciaQueja: { programasCompetencia: { idProgramaFormativo: id } } },
//          relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA", "observacionQueja"]
//       })
//    }

//    getQuejaComite(id: any): Promise<QuejasComiteEntity[]> {
//       return this.quejaRepository.find({
//          where: { comiteQueja: { codigoComite: id } },
//          relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA", "observacionQueja"]
//       })
//    }

//    getOneQueja(id: number): Promise<QuejasComiteEntity> {
//       return this.quejaRepository.findOne({ 
//          where: { idQueja: id },
//          relations: ["aprendizQueja.fichaAprendiz" ,"usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA", "observacionQueja"]
//       });
//    }

//    async updateQueja(idQueja: any, queja: UpdateQuejasDTO): Promise<QuejasComiteEntity> {
//       const searchQueja = await this.quejaRepository.findOne({
//          where: { idQueja }
//       })
//       if (!searchQueja) {
//          throw new Error("La queja no existe");
//       }

//       const updateQueja = this.quejaRepository.merge(searchQueja, plainToClass(QuejasComiteEntity, queja));
//       return this.quejaRepository.save(updateQueja);
//    }

//    deleteQueja(id:number){
//       return this.quejaRepository.delete({idQueja:id})
//    }

//    getStatusMotivo(motivo: any): Promise<QuejasComiteEntity[]>{
//       return this.quejaRepository.find({
//          where: {motivoQueja: {idMotivoComite: motivo}},
//          relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA", "observacionQueja"]

//       })
//    }

//    getStatusEstado(estado: any): Promise<QuejasComiteEntity[]>{
//       return this.quejaRepository.find({
//          where: {estadoQueja: {idEstadoQuejas: estado}},
//          relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA", "observacionQueja"]

//       })
//    }
// }


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuejasComiteEntity } from 'src/db/entities/quejas/quejas_comite.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreateQuejasDTo, UpdateQuejasDTO } from './dto/quejas.dto';


@Injectable()
export class QuejasService {
   constructor(@InjectRepository(QuejasComiteEntity) private quejaRepository: Repository<QuejasComiteEntity>,
   ) { }

   async createQueja(queja: CreateQuejasDTo) {
      const newQueja = this.quejaRepository.create(plainToClass(QuejasComiteEntity, queja))
      return await this.quejaRepository.save(newQueja)
   }

   getAllQuejas() {
      return this.quejaRepository.find({
         // relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja",]
         relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA"]
      })
   }

   getQuejaInstructor(id: any): Promise<QuejasComiteEntity[]> {
      return this.quejaRepository.find({
         where: { usuarioQueja: { idUsuario: id } },
         relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA"]
      })
   }

   getQuejaPCA(id: any): Promise<QuejasComiteEntity[]> {
      return this.quejaRepository.find({
         where: { competenciaQueja: { programasCompetencia: { idProgramaFormativo: id } } },
         relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA"]
      })
   }

   getQuejaComite(id: any): Promise<QuejasComiteEntity[]> {
      return this.quejaRepository.find({
         where: { comiteQueja: { codigoComite: id } },
         relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA"]
      })
   }

   getOneQueja(id: number): Promise<QuejasComiteEntity> {
      return this.quejaRepository.findOne({ 
         where: { idQueja: id },
         relations: ["aprendizQueja.fichaAprendiz" ,"usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA"]
      });
   }

   async updateQueja(idQueja: any, queja: UpdateQuejasDTO): Promise<QuejasComiteEntity> {
      const searchQueja = await this.quejaRepository.findOne({
         where: { idQueja }
      })
      if (!searchQueja) {
         throw new Error("La queja no existe");
      }

      const updateQueja = this.quejaRepository.merge(searchQueja, plainToClass(QuejasComiteEntity, queja));
      return this.quejaRepository.save(updateQueja);
   }

   deleteQueja(id:number){
      return this.quejaRepository.delete({idQueja:id})
   }

   getStatus(motivo: any): Promise<QuejasComiteEntity[]>{
      return this.quejaRepository.find({
         where: {estadoQueja: {idEstadoQuejas: motivo}},
         relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja.observacionResultadoA"]

      })
   }

   // async cargarDatosExcelQue(datos: CargarExcelQuejasDto): Promise<any>{
   //    const tipoDocumentoEquivalencias = {
   //       "CC": 1,
   //       "TI": 2,
         
   //     };

   //    const buffer = Buffer.from(datos.data, 'base64');

   //    const workbook = new ExcelJS.Workbook();
   //    await workbook.xlsx.load(buffer);
   //    var quejasNoProcesadas = [];

   //    for (const worksheet of workbook.worksheets) {

   //       // worksheet.eachRow({includeEmpty: false}, async (row, rowIndex) => { 
   //       //    if (rowIndex < 17) return;

   //       //    const quejas: CreateQuejasDTo = {
   //       //       programaFicha : Number(row.getCell(2).value),
   //       //       correo: String(row.getCell(3).value),
   //       //    }
   //       // })

   //       worksheet.eachRow({ includeEmpty: false}, async (row, rowIndex) => {
   //          // const fichaId = Number(worksheet.getCell(9).value).split('-')[0].trim();
   //       // if (fichas instanceof HttpException) {}
   //          if(rowIndex < 17) return;

   //          const quejas: CreateQuejasDTo = {
   //             // programaFicha : Number(row.getCell(2).value),
   //             correo: String(row.getCell(3).value),

   //          }
   //       })
          
   //    }

   // }
}
