import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AprendicesEntity, CompetenciaEntity, EntregaFichaEntity, EstadoDecisionEntity, QuejasComiteEntity, ResultadoAprendizajeEntity, UsuariosEntity } from '..';

@Entity('observaciones_aprendiz')
export class ObservacionesAprendizEntity {
   @PrimaryGeneratedColumn()
   idObservacionAprendiz: number;
   
   @Column()
   trimestre: number;

   @Column({ type: "datetime", default: () => 'CURRENT_TIMESTAMP' })
   fechaHora: Date;

   @Column()
   ObservacionAprendiz: string;

   //======== Claves foráneas de otras tablas ========
   @ManyToOne(() => AprendicesEntity, (aprendiz) => aprendiz.observacionesAprendiz, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idAprendiz" })
   aprendizObservacion: AprendicesEntity;

   @ManyToOne(() => UsuariosEntity, (usuario) => usuario.observacionesUsuario, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idUsuario" })
   usuarioObservacion: UsuariosEntity;

   @ManyToOne(() => EstadoDecisionEntity, (estadoDecision) => estadoDecision.observacionesDecision, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idEstadoDecision" })
   decisionObservacion: EstadoDecisionEntity;

   @ManyToOne(() => CompetenciaEntity, (competencia) => competencia.observacionCompetencia, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idCompetencia" })
   competenciaObservacion: CompetenciaEntity;

   @ManyToOne(() => ResultadoAprendizajeEntity, (resultadoAprendizaje) => resultadoAprendizaje.observacionResultadoA, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idResultadoAprendizaje" })
   resultadoAObservacion: ResultadoAprendizajeEntity;

   @ManyToOne(() => EntregaFichaEntity, (entregaFicha) => entregaFicha.observacionEntrega, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idEntregaFicha" })
   entregaObservacion: EntregaFichaEntity;

   //======== Claves foráneas para otras tablas ========
   @OneToMany(() => QuejasComiteEntity, (quejasComite) => quejasComite.observacionQueja, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   quejaObservacion: QuejasComiteEntity[];
}