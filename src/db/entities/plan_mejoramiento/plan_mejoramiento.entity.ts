import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AprendicesEntity, EstadoDecisionEntity, MotivosComiteEntity, QuejasComiteEntity, UsuariosEntity } from '..';

@Entity('plan_mejoramiento')
export class PlanMejoramientoEntity {
   @PrimaryGeneratedColumn()
   idPlanMejoramiento: number;

   @Column()
   trimestre: number

   @Column({ nullable: true })
   archivoPlanMejoramiento: string;

   @Column({default: true})
   activo: boolean;

   //======== Claves foráneas de otras tablas ========
   @ManyToOne(() => QuejasComiteEntity, (quejas) => quejas.planMejoramientoQuejas, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "IdQueja" })
   quejaPlanMejoramiento: QuejasComiteEntity;

   @ManyToOne(() => UsuariosEntity, (usuario) => usuario.planMejoramientoUsuarios, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idUsuario" })
   usuarioPlanMejoramiento: UsuariosEntity;

   @ManyToOne(() => AprendicesEntity, (aprendices) => aprendices.planMejoramientoAprendices, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idAprendiz" })
   aprendizPlanMejoramiento: AprendicesEntity;
   
   @ManyToOne(() => EstadoDecisionEntity, (estadoDecision) => estadoDecision.planMejoramientoDecisiones, { nullable: true, onUpdate: "CASCADE", onDelete: "CASCADE"})
   @JoinColumn({ name: "idEstadoDecision"})
   decisionPlanMejoramiento: EstadoDecisionEntity;

   @ManyToOne(() => MotivosComiteEntity, (motivoComite) => motivoComite.planMejoramientoMotivos, { nullable: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idMotivoComite" })
   motivoPlanMejoramiento: MotivosComiteEntity;
   
   @Column({ nullable: true })
   descripcionMotivo: string;
}