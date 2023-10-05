import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CompetenciaEntity, FichasEntity, UsuariosEntity } from '..';

@Entity('programas_formativos')
export class ProgramasFormativosEntity {
   @PrimaryGeneratedColumn()
   idProgramaFormativo: number;

   @Column()
   nombrePF: string;

   @Column()
   abreviaturaPF: string;

   @Column({ type: "bigint" })
   codigoPF: number;

   @Column()
   trimestres: number;

   //======== Claves foráneas para otras tablas ========
   @OneToMany(() => CompetenciaEntity, (competencia) => competencia.programasCompetencia)
   competenciaPrograma: CompetenciaEntity[];

   @ManyToMany(() => UsuariosEntity, (usuario) => usuario.programaUsuarios)
   usuariosPrograma: UsuariosEntity[];

   @OneToMany(() => FichasEntity, (fichas) => fichas.programaFicha)
   fichasPrograma: FichasEntity[];
}