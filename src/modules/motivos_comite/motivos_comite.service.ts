import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotivosComiteEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { CreateMotivoComiteDto, UpdateMotivoComiteDto } from './dto/motivos_comite.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MotivosComiteService {
   constructor(@InjectRepository(MotivosComiteEntity) private motivosService: Repository<MotivosComiteEntity>) { }

   async crearMotivo(motivo: CreateMotivoComiteDto) {
      const searchMotivo = await this.motivosService.findOne({
         where: { nombreMotivo: motivo.nombreMotivo }
      });
      const res = {
         status: null,
         msg: null,
         data: null,
      }

      if (searchMotivo) {
         res.status = 400;
         res.msg = "El motivo ya existe";

         return res;
      }
      

      const newMotivo = this.motivosService.create(motivo);
      const created = await this.motivosService.save(newMotivo);

      res.status = 200;
      res.msg = "Motivo creado correctamente"
      res.data = created;

      return res;
   }

   listarMotivos(): Promise<MotivosComiteEntity[]> {
      return this.motivosService.find();
   }

   mostrarMotivo(idMotivo: any): Promise<MotivosComiteEntity> {
      return this.motivosService.findOne(idMotivo);
   }

   async actualizarMotivo(idMotivo: any, motivo: UpdateMotivoComiteDto) {
      const searchMotivo = await this.motivosService.findOne({
         where: { idMotivoComite: idMotivo }
      });
      const res = {
         status: null,
         msg: null,
         data: null,
      }

      if (!searchMotivo) {
         res.status = 400;
         res.msg = "Motivo no encontrado";

         return res
      }
      if (searchMotivo.nombreMotivo === motivo.nombreMotivo) {
         res.status = 200;
         res.msg = "Motivo actualizado correctamente";

         return res;
      }


      const validExist = await this.listarMotivos()
      const validate = validExist.findIndex(item => item.nombreMotivo === motivo.nombreMotivo)

      if (validate !== -1) {
         res.status = 400;
         res.msg = "El motivo ya existe"
         return res
      }


      const updateMotivo = this.motivosService.merge(plainToClass(MotivosComiteEntity, searchMotivo), plainToClass(MotivosComiteEntity, motivo));
      const updated = await this.motivosService.save(updateMotivo);

      res.status = 200;
      res.msg = "Motivo actualizado correctamente";
      res.data = updated;

      return res
   }
}
