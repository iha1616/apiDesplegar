import { Module } from '@nestjs/common';
import { PermisosController } from './permisos.controller';
import { PermisosService } from './permisos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisosEntity } from 'src/db/entities';


@Module({
  imports:[TypeOrmModule.forFeature([PermisosEntity])],
  controllers: [PermisosController],
  providers: [PermisosService],
  exports:[PermisosService]
})
export class PermisosModule {}
