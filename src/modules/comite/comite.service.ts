import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComiteEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { CreateComiteDto, UpdateComiteDto } from './dto/comite.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ComiteService {
   constructor(@InjectRepository(ComiteEntity) private comiteService: Repository<ComiteEntity>) {}

   crearComite(comite: CreateComiteDto): Promise<ComiteEntity> {
      const newComite = this.comiteService.create(plainToClass(ComiteEntity, comite))
      return this.comiteService.save(newComite);
   }

   listarComites(): Promise<ComiteEntity[]> {
      return this.comiteService.find({
         relations: ["pcaComite.programaFormativo", "pcaComite.usuario"]
         // relations: ["pcaComite", "pcaComite.programaFormativo", "pcaComite.usuario"]
      })
   }

   getComiteByStatus(status: any): Promise<ComiteEntity[]> {
      return this.comiteService.find({
         where: { estadoComite: status },
         relations: ["pcaComite.programaFormativo", "pcaComite.usuario"]
      })
   }

   mostrarComite(codigoComite: any): Promise<ComiteEntity> {
      return this.comiteService.findOne({
         where: { codigoComite: codigoComite },
         relations: ["pcaComite.programaFormativo", "pcaComite.usuario"]
      })
   }

   async actualizarComite(codigoComite: any, comite: UpdateComiteDto) {
      const searchComite = await this.comiteService.findOne({
         where: { codigoComite: codigoComite },
      });

      if (!searchComite) {
         const error = {
            error: "Comité no encontrado",
            label: "",
            status: false
         }
         return error
      }

      const updateComite = this.comiteService.merge(plainToClass(ComiteEntity, searchComite), plainToClass(ComiteEntity, comite));
      const updated = await this.comiteService.save(updateComite);
      return {
         res: {
            status: 200,
            msg: "Comité actualizado correctamente",
         },
         data: updated
      }
   }
}
