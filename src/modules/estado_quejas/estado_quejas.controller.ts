import { Body, Controller, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EstadoQuejasService } from './estado_quejas.service';
import { CreateEstadoQuejasDto, UpdateEstadoQuejasDto } from './dto/estado_quejas.dto';

@ApiTags("Estado Quejas")
@Controller('estado-quejas')
export class EstadoQuejasController {
   constructor(private estadoQService: EstadoQuejasService) {}

   @Get()
   async listarEstadosQ() {
      return await this.estadoQService.listarEstadosQ();
   }

   @Get(':id')
   async mostrarEstadoQ(@Param('id', ParseIntPipe) id) {
      return await this.estadoQService.mostrarEstadoQ(id);
   }

   @Post()
   async crearEstadoQ(@Body() estadoQ: CreateEstadoQuejasDto) {
      return await this.estadoQService.crearEstadoQ(estadoQ);
   }

   @Post(":id")
   async actualizarEstadoQ(@Param('id', ParseIntPipe) id, @Body() estadoQ: UpdateEstadoQuejasDto) {
      return await this.estadoQService.actualizarEstadoQ(id, estadoQ);
   }
}
