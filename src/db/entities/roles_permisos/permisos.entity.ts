import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesEntity } from "..";


@Entity('permisos')
export class PermisosEntity {
   @PrimaryGeneratedColumn()
   idPermiso: number;

   @Column()
   modulo: string;

   @Column()
   subModulo: string;

   @Column()
   nombrePermiso: string;

   @Column({ nullable: true })
   link: string;

   //======== Claves foráneas para otras tablas ========
   @ManyToMany(() => RolesEntity, (rol) => rol.permisosRol)
   rolPermisos: RolesEntity[];
}