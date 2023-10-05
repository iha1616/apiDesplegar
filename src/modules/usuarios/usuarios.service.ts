import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoDocumentoService } from '../tipo-documento/tipo-documento.service';
import { RolesService } from '../roles/roles.service';
import { UsuariosEntity } from '../../db/entities/usuarios/usuarios.entity';
// import * as bcrypt from 'bcryptjs';
import { createUsuarioDto, updateUsuarioDto } from './dto/createUsuarios.dto';
import { plainToClass } from 'class-transformer';
import { AccesoService } from '../acceso/acceso.service';
import { AccesoEntity } from 'src/db/entities';


@Injectable()
export class UsuariosService {
   constructor(@InjectRepository(UsuariosEntity) private UsuariosRepository: Repository<UsuariosEntity>,
      private accesoService: AccesoService
   ) { }

   async createUsuario(usuario: createUsuarioDto): Promise<UsuariosEntity> {
      const validateDocumento = await this.accesoService.getAccesoDocumento(usuario.documento);

      if (validateDocumento) {
         throw "Documento ya registrado"
      }

      const createUsuario = this.UsuariosRepository.create(plainToClass(UsuariosEntity, usuario));
      const saveUsuario = await this.UsuariosRepository.save(createUsuario);

      if (!saveUsuario) {
         throw "F, no se pudo"
      }

      const accesoUsuario = {
         documento: saveUsuario.documento,
         password: saveUsuario.documento,
         idUsuarioAprendiz: saveUsuario.idUsuario,
         tablaAcceso: 1
      }

      await this.accesoService.createAcceso(plainToClass(AccesoEntity, accesoUsuario))

      return saveUsuario
   }

   async getUsuarios() {
      return await this.UsuariosRepository.find({
         relations: ['tipoDocumentoUsuario', 'rolUsuario']
      });
   }

   async updateUsuario(idUsuario: any, usuario: updateUsuarioDto) {
      const searchUsua = await this.UsuariosRepository.findOne({
         where: { idUsuario }
      })

      if (!searchUsua) {
         return new HttpException('Usuario no encontrado', 404)
      }

      const updateUsua = this.UsuariosRepository.merge(searchUsua, plainToClass(UsuariosEntity, usuario));
      return this.UsuariosRepository.save(updateUsua);
   }


   getUsuariosRol(id: any): Promise<UsuariosEntity[]> {
      return this.UsuariosRepository.find({
         where: { rolUsuario: { idRol: id } },
         relations: ['tipoDocumentoUsuario', 'rolUsuario']
      })
   }




}
