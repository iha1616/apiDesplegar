import { Module } from '@nestjs/common';
import { FichaUsuarioController } from './ficha-usuario.controller';
import { FichaUsuarioService } from './ficha-usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaUsuariosEntity } from 'src/db/entities';
import { FichasModule } from '../fichas/fichas.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([FichaUsuariosEntity]), FichasModule, UsuariosModule],
  controllers: [FichaUsuarioController],
  providers: [FichaUsuarioService]
})
export class FichaUsuarioModule {}
