import { Controller, Get, Post, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { FichaUsuarioService } from './ficha-usuario.service';
import { FichaUsuariosEntity } from 'src/db/entities';
import { CreateDtoFichasUsua, UpdateDtoFichasUsua } from './dto/FichaUsuaDTO';

@Controller('ficha-usuario')
export class FichaUsuarioController {
    constructor(private fichaUsuaService : FichaUsuarioService){}
    
    @Get()
    getFichasU(): Promise<FichaUsuariosEntity[]>{
        return this.fichaUsuaService.getFichaUsuas();
    }

    @Get(':id')
    getFichaU(@Param('id', ParseIntPipe) id : number){
        return this.fichaUsuaService.getFichaUsua(id);
    }

    @Post()
    createFichaU(@Body() CreateFichaUDto: CreateDtoFichasUsua){
      return this.fichaUsuaService.createFichaUsua(CreateFichaUDto)

    }
    @Put(':id')
    updateFichaU(@Param('id', ParseIntPipe)id: number, @Body() fichaU : UpdateDtoFichasUsua){
      return this.fichaUsuaService.updateFichaUsua(id, fichaU)

    }
}
