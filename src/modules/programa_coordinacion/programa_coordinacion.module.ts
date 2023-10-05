import { Module } from '@nestjs/common';
import { ProgramaCoordinacionService } from './programa_coordinacion.service';
import { ProgramaCoordinacionController } from './programa_coordinacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PCAEntity } from 'src/db/entities';
import { ProgramasFormativosModule } from '../programas_formativos/programas_formativos.module';
import { UsuariosModule } from '../usuarios/usuarios.module';



@Module({
  imports:[TypeOrmModule.forFeature([PCAEntity]), ProgramasFormativosModule, UsuariosModule ],
  controllers: [ProgramaCoordinacionController],
  providers: [ProgramaCoordinacionService],
  exports:[ProgramaCoordinacionService]
})
export class ProgramaCoordinacionModule {}
