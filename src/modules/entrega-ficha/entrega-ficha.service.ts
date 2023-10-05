import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntregaFichaEntity } from 'src/db/entities/entrega_ficha/entrega_ficha.entity';
import { Repository } from 'typeorm';
import { actualizarEntregaFichaDto, crearEntregaFichaDto } from './dto/crear-entrega-ficha-dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EntregaFichaService {
   constructor(@InjectRepository(EntregaFichaEntity) private entregaFichaRepository: Repository<EntregaFichaEntity>) { }

   async createEntregaFicha(EntregaFicha: crearEntregaFichaDto) {
      const newEntregaFicha = await this.entregaFichaRepository.create(plainToClass(EntregaFichaEntity, EntregaFicha));
      return this.entregaFichaRepository.save(newEntregaFicha);

   }

   //  async getEntregaFicha() {
   //      return  await this.entregaFichaRepository.find({
   //          relations:["usuarioEntregaFicha","fichaEntrega","competenciaEntregaFicha","resultadoEntregaFicha"]
   //      })
   //  }

   async getEntregaFicha(fichaEntrega: any) {
      return await this.entregaFichaRepository.find({
         where: { fichaEntrega: { codigoFicha: fichaEntrega }},
         relations: ["usuarioEntregaFicha", "fichaEntrega.programaFicha", "competenciaEntregaFicha", "resultadoEntregaFicha"]
      })
   }

   async getOneEntregaFicha(idEntregaFicha: number) {
      return await this.entregaFichaRepository.findOne({
         where: {
            idEntregaFicha
         },
         relations: ["usuarioEntregaFicha", "fichaEntrega.programaFicha", "competenciaEntregaFicha", "resultadoEntregaFicha"]
      });
   }

   async updateEntregaFicha(idEntregaFicha: number, entregaFicha: actualizarEntregaFichaDto) {
      return await this.entregaFichaRepository.update({ idEntregaFicha }, plainToClass(EntregaFichaEntity, entregaFicha));
   }
}