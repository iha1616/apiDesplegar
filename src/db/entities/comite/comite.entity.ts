import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PCAEntity, QuejasComiteEntity } from '..';

@Entity('comite')
export class ComiteEntity {
   @PrimaryGeneratedColumn()
   idComite: number;

   @Column({ type: "datetime" })
   fechaHoraInicio: Date;

   @Column({ type: "datetime" })
   fechaHoraFin: Date;

   @Column({ type: "bigint" })
   codigoComite: number; 

   @Column({ default: 0 })
   estadoComite: number;

   @Column({ nullable: true })
   link: string;

   @Column({ nullable: true })
   acta: string;

   @Column({ nullable: true })
   resolucion: string;
   
   //======== Claves foránea de otras tablas ========
   @ManyToOne(() => PCAEntity, (pca) => pca.comitesPCA, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idProgramaCoordinacion" })
   pcaComite: PCAEntity;

   //======== Claves foráneas para otras tablas ========
   @OneToMany(() => QuejasComiteEntity, (quejas) => quejas.comiteQueja)
   quejasComite: QuejasComiteEntity[];
}