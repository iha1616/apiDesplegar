import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AprendicesEntity, ArchivosProyectoEntity, FichasEntity } from '..';

@Entity('spf_grupos_proyecto')
export class GruposProyectoEntity {
   @PrimaryGeneratedColumn()
   idGrupoProyecto: number;
   
   @Column()
   nombreProyecto: string;

   //======== Claves foráneas de otras tablas ========
   @ManyToOne(() => FichasEntity, (fichas) => fichas.gruposFicha, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idFicha" })
   fichaGrupo: FichasEntity;

   //======== Claves foráneas para otras tablas ========
   @OneToMany(() => AprendicesEntity, (aprendices) => aprendices.grupoAprendiz)
   aprendicesGrupo: AprendicesEntity[];

   @OneToMany(() => ArchivosProyectoEntity, (archivosProyecto) => archivosProyecto.archivoProyecto)
   archivosGrupo: ArchivosProyectoEntity[];
}