import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoQuejasEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreateEstadoQuejasDto, UpdateEstadoQuejasDto } from './dto/estado_quejas.dto';

@Injectable()
export class EstadoQuejasService {
   constructor(@InjectRepository(EstadoQuejasEntity) private estadoQService: Repository<EstadoQuejasEntity>) {}

   crearEstadoQ(estadoQ: CreateEstadoQuejasDto): Promise<EstadoQuejasEntity> {
      const newEstadoQ = this.estadoQService.create(estadoQ);
      return this.estadoQService.save(newEstadoQ);
   }

   listarEstadosQ(): Promise<EstadoQuejasEntity[]> {
      return this.estadoQService.find();
   }

   mostrarEstadoQ(idEstadoQuejas: any): Promise<EstadoQuejasEntity> {
      return this.estadoQService.findOne(idEstadoQuejas);
   }

   actualizarEstadoQ(idEstadoQuejas: any, estadoQ: UpdateEstadoQuejasDto): Promise<EstadoQuejasEntity> {
      const searchEstadoQ = this.estadoQService.findOne(idEstadoQuejas)

      if (!searchEstadoQ) {
         throw new Error("Estado no encontrado");
      }

      const updateEstado = this.estadoQService.merge(plainToClass(EstadoQuejasEntity, searchEstadoQ), plainToClass(EstadoQuejasEntity, estadoQ));
      return this.estadoQService.save(updateEstado);
   }
}
