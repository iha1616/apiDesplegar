import { Module } from '@nestjs/common';
import { ResultadoAprendizajeController } from './resultado_aprendizaje.controller';
import { ResultadoAprendizajeService } from './resultado_aprendizaje.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadoAprendizajeEntity } from 'src/db/entities';
import { CompetenciasModule } from '../competencias/competencias.module';

@Module({
  imports:[TypeOrmModule.forFeature([ResultadoAprendizajeEntity]), CompetenciasModule],
  controllers: [ResultadoAprendizajeController],
  providers: [ResultadoAprendizajeService],
  exports:[ResultadoAprendizajeService]
})
export class ResultadoAprendizajeModule {}
