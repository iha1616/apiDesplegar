import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesPermisosEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { PermisosService } from '../permisos/permisos.service';
import { RolesService } from '../roles/roles.service';
import { RolesPermisosDto, updateRolesPermisodto } from './dto/rolespermisoDTO';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RolesPermisoService {
   constructor(@InjectRepository(RolesPermisosEntity) private rolesPermisosService: Repository<RolesPermisosEntity>) { }

   getRoutesByRol(idRol: any): Promise<RolesPermisosEntity[]> {
      return this.rolesPermisosService.find({
         where: { rol: { idRol }},
         relations: ["rol", "permiso"]
      })
   }

   async createRolPermiso(rolPermiso: RolesPermisosDto) {
      const createRP = this.rolesPermisosService.create(plainToClass(RolesPermisosEntity, rolPermiso));
      return await this.rolesPermisosService.save(createRP);
   }

   async updateRolPermiso(idRolPermiso: any, rolPermiso: updateRolesPermisodto) {
      const searchRolPermiso = await this.rolesPermisosService.findOne({
         where: { idRolPermiso }
      })

      if (!searchRolPermiso) {
         return {
            status: 400,
            msg: "No se encontró el permiso"
         }
      }

      const updateRolPemiso = this.rolesPermisosService.merge(plainToClass(RolesPermisosEntity, searchRolPermiso), plainToClass(RolesPermisosEntity, rolPermiso))
      return await this.rolesPermisosService.save(updateRolPemiso)
   }
}
