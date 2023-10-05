import { Body, Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MotivosComiteService } from './motivos_comite.service';
import { CreateMotivoComiteDto, UpdateMotivoComiteDto } from './dto/motivos_comite.dto';

@ApiTags("Motivos Comité")
@Controller('motivos-comite')
export class MotivosComiteController {
   constructor(private motivoService: MotivosComiteService) {}

   @Get()
   async listarMotivos() {
      return await this.motivoService.listarMotivos();
   }

   @Post()
   async crearMotivo(@Body() motivo: CreateMotivoComiteDto) {
      return await this.motivoService.crearMotivo(motivo);
   }

   @Get(":id")
   async mostrarMotivo(@Param("id", ParseIntPipe) id) {
      return this.motivoService.mostrarMotivo(id);
   }

   @Post(":id")
   async actualizarMotivo(@Param('id', ParseIntPipe) id: number, @Body() motivo: UpdateMotivoComiteDto) {
      return await this.motivoService.actualizarMotivo(id, motivo);
   }
}
