import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DecisionesComiteEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreateDecisionComiteDto, UpdateDecisionComiteDto } from './dto/decision_comite.dto';

@Injectable()
export class DecisionComiteService {
   constructor(@InjectRepository(DecisionesComiteEntity) private decisionService: Repository<DecisionesComiteEntity>) { }

   async crearDecision(decision: CreateDecisionComiteDto) {
      const searchDecision = await this.decisionService.findOne({
         where: { nombreDecision: decision.nombreDecision }
      })
      const res = {
         status: null,
         msg: null,
         data: null,
      }

      if (searchDecision) {
         res.status = 400;
         res.msg = "La decisión ya existe";

         return res;
      }


      const newDecision = this.decisionService.create(decision);
      const created = await this.decisionService.save(newDecision);

      res.status = 200;
      res.msg = "Decisión creada correctamente"
      res.data = created;

      return res
   }

   listarDecisiones(): Promise<DecisionesComiteEntity[]> {
      return this.decisionService.find();
   }

   mostrarDecision(idDecision: any): Promise<DecisionesComiteEntity> {
      return this.decisionService.findOne(idDecision);
   }

   async actualizarDecision(idDecision: any, decision: UpdateDecisionComiteDto) {
      const searchDecision = await this.decisionService.findOne({
         where: { idDecision: idDecision }
      });
      const res = {
         status: null,
         msg: null,
         data: null,
      }

      if (!searchDecision) {
         res.status = 400;
         res.msg = "Decisión no encontrada";

         return res
      }

      if (searchDecision.nombreDecision === decision.nombreDecision) {
         res.status = 200;
         res.msg = "Decisión actualizada correctamente"

         return res;
      }

      const validExist = await this.listarDecisiones()
      const validate = validExist.findIndex(item => item.nombreDecision === decision.nombreDecision)

      if (validate !== -1) {
         res.status = 400;
         res.msg = "La decisión ya existe";

         return res;
      }
      const updateDecision = this.decisionService.merge(plainToClass(DecisionesComiteEntity, searchDecision), plainToClass(DecisionesComiteEntity, decision));
      const updated = await this.decisionService.save(updateDecision);

      res.status = 200;
      res.msg = "Decisión actualizada correctamente";
      res.data = updated;

      return res;
   }
}
