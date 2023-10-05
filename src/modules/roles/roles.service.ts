import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from 'src/db/entities/roles_permisos/roles.entity';
import { In, Repository } from 'typeorm';
import { RolesDto, updateRoledto } from './dto/createRoles.dto';
import { PermisosEntity } from 'src/db/entities/roles_permisos/permisos.entity';
import { plainToClass } from 'class-transformer';
// import { RolesPermisosEntity } from 'src/db/entities/roles_permisos/roles_permisos.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RolesEntity) private RolesRepository: Repository<RolesEntity>,
        @InjectRepository(PermisosEntity) private PermisosRepository: Repository<PermisosEntity>,
        // @InjectRepository(RolesPermisosEntity) private RolesPermisosRepository: Repository<RolesPermisosEntity>,
    ) { }

    createRoles(roles: RolesDto) {
        const newRole = this.RolesRepository.create(roles);
        return this.RolesRepository.save(newRole);
    }

    getRoles(): Promise<RolesEntity[]> {
      return this.RolesRepository.find()
    }

    getRol(idRol: number) {
        const rol = this.RolesRepository.findOne({
            where: {
                idRol
            }
        });
        if (!rol) {
            throw new HttpException('Rol no encontrado', 404);
        }
        return rol;
    }

    async updateRol(idRol: any, rol: updateRoledto) {
        const searchRol = await this.RolesRepository.findOne({
         where: { idRol }
        })

        if (!searchRol) {
         return {
            status: 400,
            msg: "No se encontró el Rol"
         }
        }

        const updateRol = this.RolesRepository.merge(plainToClass(RolesEntity, searchRol), plainToClass(RolesEntity, rol))
        return await this.RolesRepository.save(updateRol)
    }

    async asignarPermisosARol(idRol: any, permisosIds: number[]) {
        const rol = await this.RolesRepository.findOne({
            where: {
                idRol
            },
            relations: ['permisosRol'],
        });

        if (!rol) {
            throw new HttpException('Rol no encontrado', 404);
        }

        const permisosExistentes = permisosIds.filter((permisoId) =>
            rol.permisosRol.some((permiso) => permiso.idPermiso === permisoId)
        );

        if (permisosExistentes.length > 0) {
            throw new HttpException('Algunos permisos ya están asignados al rol', 400);
        }

        const permisos = await this.PermisosRepository.find({
            where: {
                idPermiso: In(permisosIds)
            }
        });

        if (permisos.length !== permisosIds.length) {
            throw new HttpException('Algunos permisos no existen', 400);
        }

        rol.permisosRol = [...rol.permisosRol, ...permisos];

        await this.RolesRepository.save(rol);

        return { message: 'Rol asignado correctamente' };
    }

}
