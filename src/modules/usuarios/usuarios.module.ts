import { Module, forwardRef } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuariosEntity } from 'src/db/entities/usuarios/usuarios.entity';
import { AccesoModule } from '../acceso/acceso.module';

@Module({
  imports:[TypeOrmModule.forFeature([UsuariosEntity]), forwardRef(() => AccesoModule)],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports:[UsuariosService]
})
export class UsuariosModule {}
