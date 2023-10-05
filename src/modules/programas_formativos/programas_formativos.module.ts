import { Module } from '@nestjs/common';
import { ProgramasFormativosController } from './programas_formativos.controller';
import { ProgramasFormativosService } from './programas_formativos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramasFormativosEntity } from 'src/db/entities';

@Module({
  imports:[TypeOrmModule.forFeature([ProgramasFormativosEntity])],
  controllers: [ProgramasFormativosController],
  providers: [ProgramasFormativosService],
  exports:[ProgramasFormativosService]
})
export class ProgramasFormativosModule {}
