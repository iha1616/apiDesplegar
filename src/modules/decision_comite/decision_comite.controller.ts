import { Body, Controller, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DecisionComiteService } from './decision_comite.service';
import { CreateDecisionComiteDto, UpdateDecisionComiteDto } from './dto/decision_comite.dto';


@ApiTags("Decisión Comité")
@Controller('decision-comite')
export class DecisionComiteController {
   constructor(private decisionService: DecisionComiteService) {}

   @Get()
   async listarDecisiones() {
      return await this.decisionService.listarDecisiones();
   }

   @Get(':id')
   async mostrarDecision(@Param('id', ParseIntPipe) id) {
      return await this.decisionService.mostrarDecision(id);
   }

   @Post()
   async crearDecision(@Body() decision: CreateDecisionComiteDto) {
      return await this.decisionService.crearDecision(decision);
   }

   @Post(":id")
   async actualizarDecision(@Param('id', ParseIntPipe) id, @Body() decision: UpdateDecisionComiteDto) {
      return await this.decisionService.actualizarDecision(id, decision);
   }
}
