import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccesoEntity, ArchivosProyectoEntity, EntregaFichaEntity, FichasEntity, ObservacionesAprendizEntity, PlanMejoramientoEntity, ProgramasFormativosEntity, QuejasComiteEntity, RolesEntity, TipoDocumentoEntity } from "..";

@Entity('usuarios')
export class UsuariosEntity {
   @PrimaryGeneratedColumn()
   idUsuario: number;

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

   //======== Claves foráneas de otras tablas ========
   @ManyToOne(() => TipoDocumentoEntity, (tipoDocumento) => tipoDocumento.usuariosTipoDocumento, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idTipoDocumento" })
   tipoDocumentoUsuario: TipoDocumentoEntity;

   @ManyToOne(() => RolesEntity, (rol) => rol.usuariosRol, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idRol" })
   rolUsuario: RolesEntity;

   //======== Claves foráneas para otras tablas ========
   @ManyToMany(() => ProgramasFormativosEntity, (programaFormativo) => programaFormativo.usuariosPrograma)
   programaUsuarios: ProgramasFormativosEntity[];

   @OneToMany(() => ArchivosProyectoEntity, (archivosProyecto) => archivosProyecto.usuarioArchivo)
   archivosUsuario: ArchivosProyectoEntity[];

   @OneToMany(() => EntregaFichaEntity, (entregaFicha) => entregaFicha.usuarioEntregaFicha)
   entregasFichaUsuario: EntregaFichaEntity[];

   @OneToMany(() => ObservacionesAprendizEntity, (observacionesAprendiz) => observacionesAprendiz.usuarioObservacion)
   observacionesUsuario: ObservacionesAprendizEntity[];

   @OneToMany(() => QuejasComiteEntity, (quejas) => quejas.usuarioQueja)
   quejasUsuarios: QuejasComiteEntity[];

   @OneToMany(() => PlanMejoramientoEntity, (planMejoramiento) => planMejoramiento.usuarioPlanMejoramiento)
   planMejoramientoUsuarios: PlanMejoramientoEntity[];

   @OneToMany(() => FichasEntity, (fichas) => fichas.usuarioFichaDirector)
   fichaDirectorUsuario: FichasEntity[];

   @ManyToMany(() => FichasEntity, (fichas) => fichas.usuarioFicha)
   fichaUsuario: FichasEntity[];
}