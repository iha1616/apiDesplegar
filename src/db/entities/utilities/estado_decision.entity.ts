import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObservacionesAprendizEntity, PlanMejoramientoEntity } from "..";

@Entity('estado_decision')
export class EstadoDecisionEntity {
   @PrimaryGeneratedColumn()
   idEstadoDecision: number;

   @Column()
   nombreEstadoDecision: string;

   //======== Claves foráneas para otras tablas ========
   @OneToMany(() => ObservacionesAprendizEntity, (observacionesAprendiz) => observacionesAprendiz.decisionObservacion)
   observacionesDecision: ObservacionesAprendizEntity[];

   @OneToMany(() => PlanMejoramientoEntity, (planMejoramiento) => planMejoramiento.decisionPlanMejoramiento)
   planMejoramientoDecisiones: PlanMejoramientoEntity[];
}