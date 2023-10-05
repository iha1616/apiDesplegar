import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlanMejoramientoEntity, QuejasComiteEntity } from "..";

@Entity('motivos_comite')
export class MotivosComiteEntity {
   @PrimaryGeneratedColumn()
   idMotivoComite: number;

   @Column()
   nombreMotivo: string;

   //======== Claves foráneas para otras tablas ========
   @OneToMany(() => QuejasComiteEntity, (quejas) => quejas.motivoQueja)
   quejasMotivo: QuejasComiteEntity[];

   @OneToMany(() => PlanMejoramientoEntity, (planMejoramiento) => planMejoramiento.motivoPlanMejoramiento)
   planMejoramientoMotivos: PlanMejoramientoEntity[];
}