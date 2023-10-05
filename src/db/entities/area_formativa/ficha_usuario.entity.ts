import { Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { FichasEntity, UsuariosEntity } from '..';

@Entity('ficha_usuarios')
export class FichaUsuariosEntity {
   @PrimaryGeneratedColumn()
   idFichaUsuario: number;

   //======== Claves foráneas de otras tablas ========
   @ManyToOne(() => UsuariosEntity, (usuario) => usuario.fichaUsuario, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idUsuario" })
   usuario: UsuariosEntity;

   @ManyToOne(() => FichasEntity, (fichas) => fichas.usuarioFicha , { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idFicha" })
   ficha: FichasEntity;
}