import { Module, forwardRef } from '@nestjs/common';
import { FichasController } from './fichas.controller';
import { FichasService } from './fichas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichasEntity} from 'src/db/entities';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ProgramasFormativosModule } from '../programas_formativos/programas_formativos.module';

@Module({
  imports:[TypeOrmModule.forFeature([FichasEntity]), forwardRef(() => UsuariosModule),  ProgramasFormativosModule],
  controllers: [FichasController],
  providers: [FichasService],
  exports:[FichasService]
})
export class FichasModule {}
