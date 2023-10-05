import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { AprendicesEntity, TipoDocumentoEntity, UsuariosEntity } from '..';

@Entity('acceso')
export class AccesoEntity {
   @PrimaryGeneratedColumn()
   idAcceso: number;

   @Column({ type: "bigint" })
   documento: number;

   @Column()
   password: string;

   @Column()
   idUsuarioAprendiz: number;

   @Column()
   tablaAcceso: number;

   @Column( { nullable: true})
   forgotPassword: string;
}