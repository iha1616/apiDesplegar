import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AprendicesEntity, EntregaFichaEntity, GruposProyectoEntity, ProgramasFormativosEntity, UsuariosEntity } from '..';

@Entity('fichas')
export class FichasEntity {
   @PrimaryGeneratedColumn()
   idFicha: number;

   @Column({ type: "bigint" })
   codigoFicha: number;

   @Column({ nullable: true })
   voceroFicha: string;
   
   //======== Claves foránea de otras tablas ========
   @ManyToOne(() => ProgramasFormativosEntity, (programaFormativo) => programaFormativo.fichasPrograma, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idProgramaFormativo" })
   programaFicha: ProgramasFormativosEntity;

   @ManyToOne(() => UsuariosEntity, (usuarios) => usuarios.fichaDirectorUsuario, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idUsuario" })
   usuarioFichaDirector: UsuariosEntity;

   //======== Claves foráneas para otras tablas ========
   @OneToMany(() => AprendicesEntity, (aprendices) => aprendices.fichaAprendiz)
   aprendicesFicha: AprendicesEntity[];

   @OneToMany(() => GruposProyectoEntity, (gruposProyecto) => gruposProyecto.fichaGrupo)
   gruposFicha: GruposProyectoEntity[];

   @OneToMany(() => EntregaFichaEntity, (entregaFicha) => entregaFicha.fichaEntrega)
   entregasFicha: EntregaFichaEntity[];

   @ManyToMany(() => UsuariosEntity, (usuarios) => usuarios.fichaUsuario)
   usuarioFicha: UsuariosEntity[];
}