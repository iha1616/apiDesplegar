import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermisosEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { PermisosDto, updatePermisodto } from './dto/permisosDTO';

@Injectable()
export class PermisosService {
    constructor(@InjectRepository(PermisosEntity) private permisoRepository : Repository<PermisosEntity>){}

    createPermisos(permisos : PermisosDto){
        const newPermiso = this.permisoRepository.create(permisos)
        return this.permisoRepository.save(newPermiso)

    }

    getPermisos(){
        return this.permisoRepository.find()
    }

    getPermiso(idPermiso: number){
        const permisos = this.permisoRepository.findOne({
            where:{
                idPermiso
            }
        })
        if(!permisos){
            return new HttpException('Permiso no encontrado', 404)
        }

        return permisos

    }

    updatePermiso(idPermiso: number, permiso: updatePermisodto){
        const permisos= this.permisoRepository.update({idPermiso}, permiso)
        if(!permisos){
            return new HttpException('Permiso no encontrado', 404)
        }
        return permisos

    }




}
