import { Module } from '@nestjs/common';
import { EntregaFichaController } from './entrega-ficha.controller';
import { EntregaFichaService } from './entrega-ficha.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregaFichaEntity } from 'src/db/entities/entrega_ficha/entrega_ficha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntregaFichaEntity])],
  controllers: [EntregaFichaController],
  providers: [EntregaFichaService],
})
export class EntregaFichaModule {}
