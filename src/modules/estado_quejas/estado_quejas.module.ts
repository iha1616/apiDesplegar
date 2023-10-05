import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoQuejasEntity } from 'src/db/entities';
import { EstadoQuejasController } from './estado_quejas.controller';
import { EstadoQuejasService } from './estado_quejas.service';

@Module({
   imports: [TypeOrmModule.forFeature([EstadoQuejasEntity])],
  controllers: [EstadoQuejasController],
   providers: [EstadoQuejasService]
})
export class EstadoQuejasModule {}
