import { Module } from '@nestjs/common';
import { TipoDocumentoController } from './tipo-documento.controller';
import { TipoDocumentoService } from './tipo-documento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDocumentoEntity } from '../../db/entities/usuarios/tipo_documento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDocumentoEntity])],
  controllers: [TipoDocumentoController],
  providers: [TipoDocumentoService],
  exports : [TipoDocumentoService]
})
export class TipoDocumentoModule {}
