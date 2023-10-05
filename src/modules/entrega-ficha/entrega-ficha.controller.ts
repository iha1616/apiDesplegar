import { Body, Controller, Get, Param, ParseIntPipe, Post ,Patch} from '@nestjs/common';
import { crearEntregaFichaDto } from './dto/crear-entrega-ficha-dto';
import { EntregaFichaService} from './entrega-ficha.service';
import { actualizarEntregaFichaDto } from './dto/crear-entrega-ficha-dto';

@Controller('entrega-ficha')
export class EntregaFichaController {

    constructor(private EntregaFichaService:EntregaFichaService){}
q
   //  @Get()
   //  mostrar() {
   //      return this.EntregaFichaService.getEntregaFicha();
   //  }

   @Get("ficha/:id")
    mostrar(@Param('id', ParseIntPipe) id) {
        return this.EntregaFichaService.getEntregaFicha(id);
    }
    
    @Get(':id')
    buscarUno(@Param('id', ParseIntPipe) param) {
        return this.EntregaFichaService.getOneEntregaFicha(param);
    }

    @Post()
    CrearEntrega(@Body() newEntrega:crearEntregaFichaDto){
       return this.EntregaFichaService.createEntregaFicha(newEntrega);
    }

    @Patch(':id')
    actualizar(@Param('id', ParseIntPipe)idEntregaFicha:number , @Body() actualizarEntregaFichaDto : actualizarEntregaFichaDto){
      this.EntregaFichaService.updateEntregaFicha(idEntregaFicha ,actualizarEntregaFichaDto);
    }
}
