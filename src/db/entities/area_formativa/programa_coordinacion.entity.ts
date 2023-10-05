import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComiteEntity, ProgramasFormativosEntity, UsuariosEntity } from '..';

@Entity('programa_coordinacion')
export class PCAEntity {
   @PrimaryGeneratedColumn()
   idPCA: number;

   //======== Claves foránea de otras tablas ========
   @ManyToOne(() => ProgramasFormativosEntity, (programaFormativo) => programaFormativo.usuariosPrograma, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idProgramaFormativo" })
   programaFormativo: ProgramasFormativosEntity;

   @ManyToOne(() => UsuariosEntity, (usuarios) => usuarios.programaUsuarios, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idUsuario" })
   usuario: UsuariosEntity;

   //======== Claves foráneas para otras tablas ========
   @OneToMany(() => ComiteEntity, (comite) => comite.pcaComite)
   comitesPCA: ComiteEntity[];
}