import { Body, Controller, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EstadoDecisionService } from './estado_decision.service';
import { CreateEstadoDecisionDto, UpdateEstadoDecisionDto } from './dto/estado_decision.dto';

@ApiTags("Estado Decisión")
@Controller('estado-decision')
export class EstadoDecisionController {
   constructor(private estadoService: EstadoDecisionService) {}

   @Get()
   async listarEstados() {
      return await this.estadoService.listarEstados();
   }

   @Get(':id')
   async mostrarEstado(@Param('id', ParseIntPipe) id) {
      return await this.estadoService.mostrarEstado(id);
   }

   @Post()
   async crearEstado(@Body() estado: CreateEstadoDecisionDto) {
      return await this.estadoService.crearEstado(estado);
   }

   @Post(":id")
   async actualizarEstado(@Param('id', ParseIntPipe) id, @Body() estado: UpdateEstadoDecisionDto) {
      return await this.estadoService.actualizarEstado(id, estado);
   }
}
