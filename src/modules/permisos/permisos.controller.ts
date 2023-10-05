import { Controller, Get, Post, Put, Param,Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermisosService } from './permisos.service';
import { PermisosEntity } from 'src/db/entities';
import { PermisosDto, updatePermisodto } from './dto/permisosDTO';

//* Titulo que muestra en swagger
@ApiTags('Roles')
@Controller('permisos')
export class PermisosController { 
    constructor (private permisoService : PermisosService){}

    @Get()
    getPermisos(): Promise<PermisosEntity[]>{
        return this.permisoService.getPermisos();

    }

    @Get(':id')
    getPermiso(@Param('id', ParseIntPipe) id:number){
        return this.getPermiso(id);

    }

    @Post()
    crearPermiso(@Body()PermisosDto: PermisosDto): Promise<PermisosEntity>{
        return this.permisoService.createPermisos(PermisosDto)

    }

    @Put(':id')
    updatePermiso(@Param('id', ParseIntPipe)id: number, @Body()PermisoDTO: updatePermisodto)
    {
        return this.permisoService.updatePermiso(id,PermisoDTO)

    }


}
