import { Module } from '@nestjs/common';
import { PlanMejoramientoEntity } from 'src/db/entities'; 
import { UsuariosEntity } from 'src/db/entities'; 
import { PlanMejoramientoController } from './plan-mejoramiento.controller';
import { PlanMejoramientoService } from './plan-mejoramiento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([PlanMejoramientoEntity,UsuariosEntity])],
  controllers: [PlanMejoramientoController],
  providers: [PlanMejoramientoService]
})
export class PlanMejoramientoModule {}
