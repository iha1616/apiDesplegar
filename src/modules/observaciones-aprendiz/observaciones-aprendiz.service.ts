import { Injectable } from '@nestjs/common';
import { ObservacionesAprendizEntity } from 'src/db/entities/entrega_ficha/observaciones_aprendiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { actualizarObservacionAprendizDto, crearObservacionAprendizDto } from './Dto/crear-observacion-aprendiz-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Observaciones del Aprendiz")
@Injectable()
export class ObservacionesAprendizService {
   constructor(@InjectRepository(ObservacionesAprendizEntity) private observacionesService: Repository<ObservacionesAprendizEntity>) { }

   async create(observacion: crearObservacionAprendizDto) {
      const newQueja = this.observacionesService.create(plainToClass(ObservacionesAprendizEntity, observacion))
      return await this.observacionesService.save(newQueja)
      //! Se debe crear la queja desde aquí (tal vez recibiendo dos parámetros)
   }

   //  getAllobservacionAprendiz(){
   //      return this.observacionesService.find({
   //          relations: ["aprendizObservacion", "usuarioObservacion", "decisionObservacion", ""]
   //      })
   //  }

   getAllobservacionAprendiz(aprendizObservacion: any) {
      return this.observacionesService.find({
         where: { aprendizObservacion: { idAprendiz: aprendizObservacion }},
         relations: ["aprendizObservacion", "usuarioObservacion", "decisionObservacion", "entregaObservacion"]
      })
   }
   async getObservacionesEntrega(aprendizObservacion: any) {
      return await this.observacionesService.find({
         where: { entregaObservacion: { idEntregaFicha: aprendizObservacion }},
         relations: ["aprendizObservacion", "usuarioObservacion", "decisionObservacion", "entregaObservacion"]
      })
   }

   getOneObservacionAprendiz(idObservaciones: number): Promise<ObservacionesAprendizEntity> {
      return this.observacionesService.findOne({
         where: { idObservacionAprendiz: idObservaciones },
         relations: ["aprendizObservacion", "usuarioObservacion", "decisionObservacion", "entregaObservacion"]
      });
   }

   async updateObservacionAprendiz(idObservacion: any, observacionAprendiz: actualizarObservacionAprendizDto): Promise<ObservacionesAprendizEntity> {
       const searchObservacion = await this.observacionesService.findOne({
          where: { idObservacionAprendiz: idObservacion }
       })
 
       if (!searchObservacion) {
          throw new Error("La queja no existe");
       }


          
       const updateQueja = this.observacionesService.merge(plainToClass(ObservacionesAprendizEntity, searchObservacion), plainToClass(ObservacionesAprendizEntity, observacionAprendiz));
       return await this.observacionesService.save(updateQueja);
    } 
}
