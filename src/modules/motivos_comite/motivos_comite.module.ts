import { Module } from '@nestjs/common';
import { MotivosComiteController } from './motivos_comite.controller';
import { MotivosComiteService } from './motivos_comite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivosComiteEntity } from 'src/db/entities';

@Module({
   imports: [TypeOrmModule.forFeature([MotivosComiteEntity])],
  controllers: [MotivosComiteController],
  providers: [MotivosComiteService]
})
export class MotivosComiteModule {}
