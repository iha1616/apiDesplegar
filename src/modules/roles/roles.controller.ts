import { Body, Controller, Param, ParseIntPipe, Get, Put, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesEntity } from 'src/db/entities';
import { RolesDto, updateRoledto } from './dto/createRoles.dto';
import { ApiTags } from '@nestjs/swagger';

//* Titulo que muestra en swagger
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @Get()
    async getRoles() {
        return await this.rolesService.getRoles();
    }

    @Get(':id')
    getRol(@Param('id', ParseIntPipe) id: number) {
        return this.rolesService.getRol(id);
    }

    @Post()
    createRoles(@Body() CreateRolDto: RolesDto): Promise<RolesEntity> {
        return this.rolesService.createRoles(CreateRolDto);
    }

    @Post(':id')
    async updateRoles(@Param('id', ParseIntPipe) id: number, @Body() roles: updateRoledto) {
      return await this.rolesService.updateRol(id, roles);
    }

    @Put('asignar/:id')
    asignarPermisosARol(@Param('id', ParseIntPipe) id: number, @Body() body: { permisosIds: number[] }) {
        return this.rolesService.asignarPermisosARol(+id, body.permisosIds);
    }
}