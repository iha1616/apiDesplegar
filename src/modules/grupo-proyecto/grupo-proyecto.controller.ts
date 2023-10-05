import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GrupoProyectoService } from './grupo-proyecto.service';
import { CreateGrupoProyectoDto } from './dto/grupo-proyecto.dto';
import { CreateArchivoProyectoDto } from './dto/archivos-proyecto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags("Grupo de Proyecto")
@Controller('grupo-proyecto')
export class GrupoProyectoController {
   constructor(private grupoService: GrupoProyectoService) { }

   // http://localhost:3000/api/grupo-proyecto/
   @Post()
   async crearGrupo(@Body() grupo: CreateGrupoProyectoDto) {
      return await this.grupoService.crearGrupo(grupo);
   }

   // http://localhost:3000/api/grupo-proyecto/
   @Get()
   async listarGrupos() {
      return await this.grupoService.listarGrupos();
   }

   // http://localhost:3000/api/grupo-proyecto/ficha/:id
   @Get("ficha/:id")
   async listarGruposFicha(@Param("id", ParseIntPipe) id: number) {
      return await this.grupoService.listarGruposFicha(id);
   }

   // http://localhost:3000/api/grupo-proyecto/:id
   @Post(":id")
   async actualizarGrupo(@Param('id', ParseIntPipe) id, @Body() grupoActualizar) {
      return await this.grupoService.actualizarGrupo(id, grupoActualizar);
   }

   // http://localhost:3000/api/grupo-proyecto/:id
   @Get(":id")
   async listarGrupo(@Param('id', ParseIntPipe) id: number) {
      return await this.grupoService.listarGrupo(id);
   }

   // http://localhost:3000/api/grupo-proyecto/archivos
   @UseInterceptors(
      FileInterceptor(
         "file",
         {
            storage: diskStorage({
               destination: "./uploads/spf",
               filename: function (req, file, cb) {
                  cb(null, `${Date.now()}_${file.originalname}`);
               }
            })
         }
      )
   )
   @Post("upload/archivos")
   async subirArchivo(@UploadedFile() file: Express.Multer.File, @Body() archivo: CreateArchivoProyectoDto) {
      const fileUpload = {
         archivoProyecto: file.filename,
         nombreArchivo: archivo.nombreArchivo,
         observacionArchivoProyecto: archivo.observacionArchivoProyecto,
         usuarioArchivo: archivo.usuarioArchivo,
         competenciaArchivo: archivo.competenciaArchivo,
         resultadoArchivo: archivo.resultadoArchivo,
         grupoArchivo: archivo.grupoArchivo
      }
      // return fileUpload
      return await this.grupoService.subirArchivo(fileUpload);
   }

   @Get("archivos/download/:filename")
   async download(@Param('filename') filename: string, @Res() res: Response) {
      // const fileLocation = path.join(process.cwd(), 'senastion_api', 'uploads/spf', filename)
      const fileLocation = path.join(__dirname, '../../../',  'uploads', 'spf', filename)
      // console.log("File: ", fileLocation)

      return res.download(fileLocation, filename)
   }

   // http://localhost:3000/api/grupo-proyecto/archivos/:id
   @Get("archivos/:id")
   async listarArchivos(@Param('id', ParseIntPipe) idGrupo: number) {
      return await this.grupoService.listarArchivos(idGrupo);
   }
}
