import { Controller, Post, Get, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CompetenciasService } from './competencias.service';
import { CompetenciaEntity } from 'src/db/entities';
import { UpdateCompeDto } from './dto/competenciasDTO';

@Controller('competencias')
export class CompetenciasController {
    constructor(private compeService: CompetenciasService) {}

    @Post()
    async createCompetencia(@Body() competencia) {
        return await this.compeService.createCompetencia(competencia)
    }

    @Get()
    getCompetencias(): Promise<CompetenciaEntity[]>{
        return this.compeService.getCompetencias();
    }

    @Get(':id')
    getCompetencia(@Param('id', ParseIntPipe) id : number){
        return this.compeService.getCompetencia(id);
    }

    @Post(':id')
    updateCompetencia(@Param('id', ParseIntPipe)id: number, @Body() competencia : UpdateCompeDto){
      return this.compeService.updateCompetencia(id, competencia)

    }

    @Get('programa/:id')
    async getCompetenciasPrograma(@Param("id", ParseIntPipe) id: number) {
      return await this.compeService.getCompetenciasPrograma(id);
    }
}
