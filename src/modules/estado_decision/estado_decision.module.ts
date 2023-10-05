import { Module } from '@nestjs/common';
import { EstadoDecisionController } from './estado_decision.controller';
import { EstadoDecisionService } from './estado_decision.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoDecisionEntity } from 'src/db/entities';

@Module({
   imports: [TypeOrmModule.forFeature([EstadoDecisionEntity])],
  controllers: [EstadoDecisionController],
  providers: [EstadoDecisionService]
})
export class EstadoDecisionModule {}
