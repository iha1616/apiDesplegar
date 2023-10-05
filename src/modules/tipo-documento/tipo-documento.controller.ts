import { Controller, Get, Put, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { TipoDocumentoEntity } from '../../db/entities/usuarios/tipo_documento.entity';
import { TDocumentoDto, UpdateTipoDto } from './dto/tipoDocumento.dto';
import { ApiTags } from '@nestjs/swagger';

//* Titulo que muestra en swagger
@ApiTags('TipoDocu')
@Controller('tipo-documento')
export class TipoDocumentoController {

    constructor(private tipDocumentoService : TipoDocumentoService){}

    @Get()
    getTiposD(): Promise<TipoDocumentoEntity[]>{
        return this.tipDocumentoService.getTipos();
    }

    @Get(':id')
    getTipoD(@Param('id', ParseIntPipe) id : number): Promise<TipoDocumentoEntity>{
        return this.tipDocumentoService.getTipo(id);

    }

    @Post()
    createTiposD(@Body() CreateTiposDdto :TDocumentoDto): Promise<TipoDocumentoEntity>{
        return this.tipDocumentoService.createTipoDocu(CreateTiposDdto);
    }

    @Put(':id')
    updateTipoD(@Param('id', ParseIntPipe)id: number, @Body() tipod : UpdateTipoDto){
        return this.tipDocumentoService.updateTipos(id, tipod);

    }
    

}
