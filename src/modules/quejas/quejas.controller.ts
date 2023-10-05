// import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
// import { CreateQuejasDTo } from './dto/quejas.dto';
// import { QuejasService } from './quejas.service';
// import { QuejasComiteEntity } from 'src/db/entities/quejas/quejas_comite.entity';
// import { UpdateQuejasDTO } from './dto/quejas.dto';

// @Controller('quejas')
// export class QuejasController {
//     constructor(private quejasService: QuejasService) { }

//     @Get()
//     getAllQuejas(): Promise<QuejasComiteEntity[]> {
//         return this.quejasService.getAllQuejas();
//     }

//     @Get(':id')
//     getOneQueja(@Param('id') id: number): Promise<QuejasComiteEntity> {
//         return this.quejasService.getOneQueja(id);
//     }

//     @Get('comite/:id')
//     getQuejaComite(@Param('id') id: number): Promise<QuejasComiteEntity[]> {
//         return this.quejasService.getQuejaComite(id);
//     }

//     @Get('programaQueja/:id')
//     async getQuejaPCA(@Param("id", ParseIntPipe) id: number) {
//         return this.quejasService.getQuejaPCA(id);
//     }
//    @Get("motivo/:id")
//     async getStatusMotivo(@Param('id', ParseIntPipe) id: number){
//         return await this.quejasService.getStatusMotivo(id)
//     }

//     @Post()
//     createQueja(@Body() newQueja: CreateQuejasDTo): Promise<QuejasComiteEntity> {
//         return this.quejasService.createQueja(newQueja);
//     }

//     @Post(':id')
//     updateQuejas(@Param('id', ParseIntPipe) id: number, @Body() queja: UpdateQuejasDTO) {
//         return this.quejasService.updateQueja(id, queja);
//     }

//     @Get('instructor/:id')
//     async getQuejaInstructor(@Param("id", ParseIntPipe) id: number) {
//         return this.quejasService.getQuejaInstructor(id);
//     }
//     @Delete(':id')
//     deleteQueja(@Param('id', ParseIntPipe) id: number) {
//         return this.quejasService.deleteQueja(id);
//     }

//     @Get("estado/:id")
//     async getStatusEstado(@Param('id', ParseIntPipe) id: number){
//         return await this.quejasService.getStatusEstado(id)
//     }
// }

import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Res } from '@nestjs/common';
import { CreateQuejasDTo } from './dto/quejas.dto';
import { QuejasService } from './quejas.service';
import { QuejasComiteEntity } from 'src/db/entities/quejas/quejas_comite.entity';
import { UpdateQuejasDTO } from './dto/quejas.dto';
import { Response } from 'express';
import path from 'path';

@Controller('quejas')
export class QuejasController {
    constructor(private quejasService: QuejasService) { }

    @Get()
    getAllQuejas(): Promise<QuejasComiteEntity[]> {
        return this.quejasService.getAllQuejas();
    }

    @Get(':id')
    getOneQueja(@Param('id') id: number): Promise<QuejasComiteEntity> {
        return this.quejasService.getOneQueja(id);
    }

    @Get('comite/:id')
    getQuejaComite(@Param('id') id: number): Promise<QuejasComiteEntity[]> {
        return this.quejasService.getQuejaComite(id);
    }

    @Get('programaQueja/:id')
    async getQuejaPCA(@Param("id", ParseIntPipe) id: number) {
        return this.quejasService.getQuejaPCA(id);
    }
   @Get("estado/:id")
    async getStatus(@Param('id', ParseIntPipe) id: number){
        return await this.quejasService.getStatus(id)
    }

    @Post()
    createQueja(@Body() newQueja: CreateQuejasDTo): Promise<QuejasComiteEntity> {
        return this.quejasService.createQueja(newQueja);
    }

    @Post(':id')
    updateQuejas(@Param('id', ParseIntPipe) id: number, @Body() queja: UpdateQuejasDTO) {
        return this.quejasService.updateQueja(id, queja);
    }

    @Get('instructor/:id')
    async getQuejaInstructor(@Param("id", ParseIntPipe) id: number) {
        return this.quejasService.getQuejaInstructor(id);
    }
    @Delete(':id')
    deleteQueja(@Param('id', ParseIntPipe) id: number) {
        return this.quejasService.deleteQueja(id);
    }

    // @Post('archivoQueja/cargar')
    // async cargarDatosExcelQue(@Body() datos: CargarExcelQuejasDto){
    //     return await this.quejasService.cargarDatosExcelQue(datos);
    // }

    @Get("file/download/:filename")
    async download(@Param('filename') filename: string, @Res() res: Response){
        const fileLocation = path.join(__dirname, '../../../', 'uploads', 'comite', 'planMejora', filename)
        return res.download(fileLocation,filename)
    }

}