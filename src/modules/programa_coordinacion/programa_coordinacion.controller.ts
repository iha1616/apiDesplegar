import { Controller, Post, Put, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProgramaCoordinacionService } from './programa_coordinacion.service';
import { PCAEntity } from 'src/db/entities';
import { CreatePCAdto, UpdatePCADto } from './dto/PCdto';

@Controller('programa-coordinacion')
export class ProgramaCoordinacionController {
    constructor(private PCAService : ProgramaCoordinacionService){}

    @Get()
    getPCAs(): Promise<PCAEntity[]>{
        return this.PCAService.getPCAS();

    }

    @Get("byPF/:id")
    async getByProgramaF(@Param("id", ParseIntPipe) id: number) {
      return await this.PCAService.getByProgramaF(id);
    }

    @Get(':id')
    getPCA(@Param('id', ParseIntPipe) id: number){
        return this.PCAService.getPCA(id)
    }

    @Post()
    createPCA(@Body() CreateDto: CreatePCAdto){
        return this.PCAService.createPCA(CreateDto)

    }

    @Post(':id')
    updatePCA(@Param('id', ParseIntPipe) id: number, @Body() PCA : UpdatePCADto){
       return this.PCAService.updatePCA(id, PCA)

    }
}
