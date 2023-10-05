import { Body, Controller, Param, ParseIntPipe, Get, Put, Post} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesPermisoService } from './roles_permiso.service';
import { RolesPermisosEntity } from 'src/db/entities';
import { RolesPermisosDto, updateRolesPermisodto } from './dto/rolespermisoDTO';

//* Titulo que muestra en swagger
@ApiTags('Roles-Permiso')
@Controller('roles-permisos')
export class RolesPermisoController {
    constructor(private rolesPermisosService: RolesPermisoService){}

    @Get("rol/:id")
    async getRoutesByRol(@Param("id", ParseIntPipe) id: number) {
      return await this.rolesPermisosService.getRoutesByRol(id);
    }

    @Post()
    async create(@Body() rolPermiso: RolesPermisosDto) {
      return await this.rolesPermisosService.createRolPermiso(rolPermiso)
    }

    @Post(":id")
    async update(@Param("id", ParseIntPipe) id: number , @Body() rolPermiso: updateRolesPermisodto) {
      return await this.rolesPermisosService.updateRolPermiso(id, rolPermiso)
    }
}
