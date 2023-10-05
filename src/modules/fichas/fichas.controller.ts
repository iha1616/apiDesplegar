import { Controller, Get, Post, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { FichasService } from './fichas.service';
import { FichasEntity } from 'src/db/entities';
import { CreateDtoFichas, UpdateDtoFichas } from './dto/createfichasDto';

@Controller('fichas')
export class FichasController {
    constructor(private fichasService : FichasService){}
    
    @Get()
    getFichas(): Promise<FichasEntity[]>{
        return this.fichasService.getFichas();
    }

    @Get(':id')
    getFicha(@Param('id', ParseIntPipe) id : number){
        return this.fichasService.getFicha(id);
    }

    @Post()
    createFicha(@Body() CreateFichaDto: CreateDtoFichas){
      return this.fichasService.createFichas(CreateFichaDto)

    }
    @Put(':id')
    updateFicha(@Param('id', ParseIntPipe)id: number, @Body() ficha : UpdateDtoFichas){
      return this.fichasService.updateFicha(id, ficha)

    }



}
