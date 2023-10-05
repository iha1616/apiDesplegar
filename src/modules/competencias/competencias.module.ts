import { Module } from '@nestjs/common';
import { CompetenciasController } from './competencias.controller';
import { CompetenciasService } from './competencias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetenciaEntity } from 'src/db/entities';
import { ProgramasFormativosModule } from '../programas_formativos/programas_formativos.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompetenciaEntity]), ProgramasFormativosModule],
  controllers: [CompetenciasController],
  providers: [CompetenciasService],
  exports:[CompetenciasService]
})
export class CompetenciasModule {}
