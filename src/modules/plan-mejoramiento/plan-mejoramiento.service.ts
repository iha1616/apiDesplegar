import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanMejoramientoEntity } from 'src/db/entities/plan_mejoramiento/plan_mejoramiento.entity';
import { plainToClass } from 'class-transformer';
import { CreatePlanMejoramientoDto, UpdatePlanMejoramientoDTO } from './dto/plan-mejoramiento-dto';

@Injectable()
export class PlanMejoramientoService {
   constructor(@InjectRepository(PlanMejoramientoEntity) private planMejoramientoRepository: Repository<PlanMejoramientoEntity>) { }

   createPlan(plan: CreatePlanMejoramientoDto) {
      const newPlan = this.planMejoramientoRepository.create(plainToClass(PlanMejoramientoEntity, plan))
      return this.planMejoramientoRepository.save(newPlan)
   }
   getPlan() {
      return this.planMejoramientoRepository.find({
         relations: ["quejaPlanMejoramiento.competenciaQueja", "quejaPlanMejoramiento.resultadoAQueja", "quejaPlanMejoramiento.estadoQueja","usuarioPlanMejoramiento", "aprendizPlanMejoramiento.fichaAprendiz", "decisionPlanMejoramiento", "motivoPlanMejoramiento"]
      })
   }
   // getPlan(usuarioPlanMejoramiento: any) {
   //    return this.planMejoramientoRepository.find({
   //       where: { usuarioPlanMejoramiento: { idUsuario: usuarioPlanMejoramiento } },
   //       relations: ["quejaPlanMejoramiento", "usuarioPlanMejoramiento", "aprendizPlanMejoramiento", "decisionPlanMejoramiento", "motivoPlanMejoramiento"]
   //    })
   // }

   getPlanAprendiz(id: any): Promise<PlanMejoramientoEntity[]> {
      return this.planMejoramientoRepository.find({
         where: { aprendizPlanMejoramiento: { idAprendiz: id } },
         relations: ["quejaPlanMejoramiento", "usuarioPlanMejoramiento", "aprendizPlanMejoramiento", "decisionPlanMejoramiento", "motivoPlanMejoramiento"]
      })
   }

   getInactivo() {
      return this.planMejoramientoRepository.find({
         where : {activo: false},
         relations: ["quejaPlanMejoramiento.competenciaQueja", "quejaPlanMejoramiento.resultadoAQueja", "quejaPlanMejoramiento.estadoQueja","usuarioPlanMejoramiento", "aprendizPlanMejoramiento.fichaAprendiz", "decisionPlanMejoramiento", "motivoPlanMejoramiento"]
      })
   }


   getOnePlan(id: number) {
      return this.planMejoramientoRepository.findOne({
         where: { idPlanMejoramiento: id },
         relations: ["quejaPlanMejoramiento", "usuarioPlanMejoramiento", "aprendizPlanMejoramiento", "decisionPlanMejoramiento", "motivoPlanMejoramiento"]
      })
   }
   async actualizarGrupo(idPlanMejoramiento: any, plan: UpdatePlanMejoramientoDTO): Promise<PlanMejoramientoEntity> {
      const searchPlan = await this.planMejoramientoRepository.findOne({
         where: { idPlanMejoramiento }
      })

      if (!searchPlan) {
         throw new Error("El plan de mejoramiento no existe");
      }

      const updatePlan = this.planMejoramientoRepository.merge(searchPlan, plainToClass(PlanMejoramientoEntity, plan));
      return this.planMejoramientoRepository.save(updatePlan);
   }

   getDecision(decision: any): Promise<PlanMejoramientoEntity[]>{
      return this.planMejoramientoRepository.find({
         where: {decisionPlanMejoramiento: {idEstadoDecision: decision}},
         relations: ["quejaPlanMejoramiento.competenciaQueja", "quejaPlanMejoramiento.resultadoAQueja", "quejaPlanMejoramiento.estadoQueja","usuarioPlanMejoramiento", "aprendizPlanMejoramiento.fichaAprendiz", "decisionPlanMejoramiento", "motivoPlanMejoramiento"]
         // relations: ["quejaPlanMejoramiento.estadoQueja", "usuarioPlanMejoramiento", "aprendizPlanMejoramiento", "decisionPlanMejoramiento", "motivoPlanMejoramiento"]

      })
   }

   deletePlan(id:number){
      return this.planMejoramientoRepository.delete({idPlanMejoramiento:id})
   }

   async actualizarPlan(trimestre: any, plan: UpdatePlanMejoramientoDTO) {
      const searchPlan = await this.planMejoramientoRepository.findOne({
         where: { trimestre: trimestre },
      });

      if (!searchPlan) {
         const error = {
            error: "Plan mejoramiento no encontrado",
            label: "",
            status: false
         }
         return error
      }

      const updatePlan = this.planMejoramientoRepository.merge(plainToClass(PlanMejoramientoEntity, searchPlan), plainToClass(PlanMejoramientoEntity, plan));
      const updated = await this.planMejoramientoRepository.save(updatePlan);
      return {
         res: {
            status: 200,
            msg: "Plan mejoramiento actualizado correctamente",
         },
         data: updated
      }
   }

   async cambiarEstado(id: number): Promise<PlanMejoramientoEntity> {
      const plan = await this.planMejoramientoRepository.findOne({where: { idPlanMejoramiento: id },});
  
      if (!plan) {
        throw new Error(`Plan de mejoramiento con ID ${id} no encontrado.`);
      }
  
      // Cambia el estado de "activo" a "inactivo"
      plan.activo = false;
  
      return this.planMejoramientoRepository.save(plan);
    }


   
}
