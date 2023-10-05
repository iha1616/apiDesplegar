import { Module, forwardRef } from '@nestjs/common';
import { AccesoController } from './acceso.controller';
import { AccesoService } from './acceso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesoEntity, AprendicesEntity, RolesPermisosEntity, UsuariosEntity } from 'src/db/entities';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AprendicesModule } from '../aprendices/aprendices.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccesoEntity, UsuariosEntity, AprendicesEntity, RolesPermisosEntity]), forwardRef(() => UsuariosModule), forwardRef(() => AprendicesModule)],
  controllers: [AccesoController],
  providers: [AccesoService],
  exports: [AccesoService]
})
export class AccesoModule {}
