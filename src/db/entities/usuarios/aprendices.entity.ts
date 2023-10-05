import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccesoEntity, FichasEntity, GruposProyectoEntity, ObservacionesAprendizEntity, PlanMejoramientoEntity, QuejasComiteEntity, RolesEntity, TipoDocumentoEntity } from '..';

@Entity('aprendices')
export class AprendicesEntity {
   @PrimaryGeneratedColumn()
   idAprendiz: number;

   @Column({ unique: true, type: "bigint" })
   documento: number;

   @Column()
   nombre: string;

   @Column()
   apellidos: string;

   @Column({ unique: true })
   email: string;

   @Column({ type: "bigint" })
   telefono: number;

   @Column({ default: 1 })
   estadoAprendiz: number;

   //======== Claves foráneas de otras tablas ========
   @ManyToOne(() => TipoDocumentoEntity, (tipoDocumento) => tipoDocumento.aprendicesTipoDocumento, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idTipoDocumento" })
   tipoDocumentoAprendiz: TipoDocumentoEntity;

   @ManyToOne(() => RolesEntity, (roles) => roles.aprendicesRol, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idRol" })
   rolAprendiz: RolesEntity;

   @ManyToOne(() => FichasEntity, (fichas) => fichas.aprendicesFicha, { nullable: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idFicha" })
   fichaAprendiz: FichasEntity;

   @ManyToOne(() => GruposProyectoEntity, (grupoProyecto) => grupoProyecto.aprendicesGrupo, { nullable: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idGrupoProyecto" })
   grupoAprendiz: GruposProyectoEntity;

   //======== Claves foráneas para otras tablas ========
   @OneToMany(() => ObservacionesAprendizEntity, (observacionesAprendiz) => observacionesAprendiz.aprendizObservacion)
   observacionesAprendiz: ObservacionesAprendizEntity[];

   @OneToMany(() => QuejasComiteEntity, (quejas) => quejas.aprendizQueja)
   quejasAprendices: QuejasComiteEntity[];

   @OneToMany(() => PlanMejoramientoEntity, (planMejoramiento) => planMejoramiento.aprendizPlanMejoramiento)
   planMejoramientoAprendices: PlanMejoramientoEntity[];
}