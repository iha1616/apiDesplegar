import { Controller, Get, Post, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProgramasFormativosService } from './programas_formativos.service';
import { ProgramasFormativosEntity } from 'src/db/entities';
import { CreatePFdto, UpdatePFdto } from './dto/p_formativosDTO';

@Controller('programas-formativos')
export class ProgramasFormativosController {
    constructor(private PFService : ProgramasFormativosService){}

    @Get()
    getPfs(): Promise<ProgramasFormativosEntity[]>{
        return this.PFService.getPFS();

    }

    @Get(':id')
    getPf(@Param('id', ParseIntPipe)id: number){
        return this.PFService.getPF(id)

    }

    @Post()
    createPf(@Body() CreateDto: CreatePFdto){
        return this.PFService.createPF(CreateDto)

    }

    @Post(':id')
    updatePf(@Param('id', ParseIntPipe) id: number, @Body() pf : UpdatePFdto){
        return this.PFService.updatePf(id, pf)

    }
}
