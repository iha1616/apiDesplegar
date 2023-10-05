import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecisionesComiteEntity } from 'src/db/entities';
import { DecisionComiteController } from './decision_comite.controller';
import { DecisionComiteService } from './decision_comite.service';

@Module({
   imports: [TypeOrmModule.forFeature([DecisionesComiteEntity])],
  controllers: [DecisionComiteController],
  providers: [DecisionComiteService]
})
export class DecisionComiteModule {}
