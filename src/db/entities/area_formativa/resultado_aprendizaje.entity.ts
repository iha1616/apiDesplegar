import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArchivosProyectoEntity, CompetenciaEntity, EntregaFichaEntity, ObservacionesAprendizEntity, QuejasComiteEntity } from '..';

@Entity('resultado_aprendizaje')
export class ResultadoAprendizajeEntity {
   @PrimaryGeneratedColumn()
   idResultadoAprendizaje: number;

   @Column()
   nombreRA: string;

   @Column({ type: "bigint" })
   codigoRA: number;

   //======== Claves foránea de otras tablas ========
   @ManyToOne(() => CompetenciaEntity, (competencia) => competencia.resultadosCompetencia, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "IdCompetencia" })
   competenciaResultado: CompetenciaEntity;

   //======== Claves foráneas para otras tablas ========
   @OneToMany(() => EntregaFichaEntity, (entregaFicha) => entregaFicha.resultadoEntregaFicha)
   entregasFichaResultado: EntregaFichaEntity[];

   @OneToMany(() => ArchivosProyectoEntity, (archivosProyecto) => archivosProyecto.resultadoArchivo)
   archivoResultado: ArchivosProyectoEntity[];

   @OneToMany(() => QuejasComiteEntity, (quejasComite) => quejasComite.resultadoAQueja)
   quejaResultadoA: QuejasComiteEntity[];

   @OneToMany(() => ObservacionesAprendizEntity, (observacionesAprendiz) => observacionesAprendiz.resultadoAObservacion)
   observacionResultadoA: ObservacionesAprendizEntity[];
}