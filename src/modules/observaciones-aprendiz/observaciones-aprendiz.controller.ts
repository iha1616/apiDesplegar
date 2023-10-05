import { Body, Controller, Get, Post, Put,Param, ParseIntPipe } from '@nestjs/common';
import { ObservacionesAprendizService } from './observaciones-aprendiz.service';
import { ObservacionesAprendizEntity } from 'src/db/entities';
import { actualizarObservacionAprendizDto, crearObservacionAprendizDto } from './Dto/crear-observacion-aprendiz-dto';

@Controller('observaciones-aprendiz')
export class ObservacionesAprendizController {

    constructor(private observacionesAprendiz: ObservacionesAprendizService){}
    
   //  @Get()
   //  getAllQuejas(): Promise<ObservacionesAprendizEntity[]>{
   //      return this.observacionesAprendiz.getAllobservacionAprendiz();
   //  }

   @Get("observacionesAprendiz/:id")
    getAllQuejas(@Param('id', ParseIntPipe) id): Promise<ObservacionesAprendizEntity[]>{
        return this.observacionesAprendiz.getAllobservacionAprendiz(id);
    }
   @Get("entrega/:id")
    getObservacionesEntrega(@Param('id', ParseIntPipe) id: number): Promise<ObservacionesAprendizEntity[]>{
        return this.observacionesAprendiz.getObservacionesEntrega(id);
    }
    
    @Get(':id')
    getOneObservacion(@Param('id') id: number): Promise<ObservacionesAprendizEntity>{
        return this.observacionesAprendiz.getOneObservacionAprendiz(id);
    }
    @Post()
    createQueja( @Body() newQueja: crearObservacionAprendizDto): Promise<ObservacionesAprendizEntity>{
        return this.observacionesAprendiz.create(newQueja) ;
    }
   @Post(':id')
    updateQuejas(@Param("id", ParseIntPipe) id: number, @Body() observacion: actualizarObservacionAprendizDto) {
       return this.observacionesAprendiz.updateObservacionAprendiz(id, observacion);   
   }
}

