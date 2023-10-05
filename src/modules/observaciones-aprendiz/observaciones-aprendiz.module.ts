import { Module } from '@nestjs/common';
import { ObservacionesAprendizService } from './observaciones-aprendiz.service';
import { ObservacionesAprendizController } from './observaciones-aprendiz.controller';
import { ObservacionesAprendizEntity } from 'src/db/entities/entrega_ficha/observaciones_aprendiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuejasModule } from '../quejas/quejas.module';

@Module({
  imports:[TypeOrmModule.forFeature([ObservacionesAprendizEntity]),QuejasModule],
  controllers: [ObservacionesAprendizController],
  providers: [ObservacionesAprendizService],
})
export class ObservacionesAprendizModule {}
