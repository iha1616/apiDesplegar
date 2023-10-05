import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoDecisionEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { CreateEstadoDecisionDto, UpdateEstadoDecisionDto } from './dto/estado_decision.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EstadoDecisionService {
   constructor(@InjectRepository(EstadoDecisionEntity) private estadoService: Repository<EstadoDecisionEntity>) {}

   crearEstado(estado: CreateEstadoDecisionDto): Promise<EstadoDecisionEntity> {
      const newEstado = this.estadoService.create(estado);
      return this.estadoService.save(newEstado);
   }

   listarEstados(): Promise<EstadoDecisionEntity[]> {
      return this.estadoService.find();
   }

   mostrarEstado(idEstado: any): Promise<EstadoDecisionEntity> {
      return this.estadoService.findOne(idEstado);
   }

   actualizarEstado(idEstado: any, estado: UpdateEstadoDecisionDto): Promise<EstadoDecisionEntity> {
      const searchEstado = this.estadoService.findOne(idEstado)

      if (!searchEstado) {
         throw new Error("Estado no encontrado");
      }

      const updateEstado = this.estadoService.merge(plainToClass(EstadoDecisionEntity, searchEstado), plainToClass(EstadoDecisionEntity, estado));
      return this.estadoService.save(updateEstado);
   }
}
