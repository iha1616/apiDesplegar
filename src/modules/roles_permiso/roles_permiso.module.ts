import { Module } from '@nestjs/common';
import { RolesPermisoController } from './roles_permiso.controller';
import { RolesPermisoService } from './roles_permiso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisosEntity, RolesEntity, RolesPermisosEntity } from 'src/db/entities';
import { RolesModule } from '../roles/roles.module';
import { PermisosModule } from '../permisos/permisos.module';

@Module({
  imports:[TypeOrmModule.forFeature([RolesPermisosEntity]), RolesModule, PermisosModule],
  controllers: [RolesPermisoController],
  providers: [RolesPermisoService]
})
export class RolesPermisoModule {}
