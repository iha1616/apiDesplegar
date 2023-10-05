import { Module } from '@nestjs/common';
import { QuejasController } from './quejas.controller';
import { QuejasService } from './quejas.service';
import { QuejasComiteEntity } from 'src/db/entities/quejas/quejas_comite.entity'; 
import { UsuariosEntity } from 'src/db/entities/usuarios/usuarios.entity';  
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([QuejasComiteEntity,UsuariosEntity])],
  controllers: [QuejasController],
  providers: [QuejasService],
  exports:[QuejasService]
})
export class QuejasModule {
}
