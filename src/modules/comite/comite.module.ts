import { Module } from '@nestjs/common';
import { ComiteController } from './comite.controller';
import { ComiteService } from './comite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComiteEntity } from 'src/db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ComiteEntity])],
  controllers: [ComiteController],
  providers: [ComiteService],
})
export class ComiteModule {}
