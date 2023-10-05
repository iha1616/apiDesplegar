import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { RolesEntity } from "./roles.entity";
import { PermisosEntity } from "./permisos.entity";

@Entity('roles_permisos')
export class RolesPermisosEntity {
   @PrimaryGeneratedColumn()
   idRolPermiso: number;

   @Column({ default: false })
   access: boolean;

   @ManyToOne(() => RolesEntity, (rol) => rol.permisosRol, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idRol" })
   rol: RolesEntity;

   @ManyToOne(() => PermisosEntity, (permiso) => permiso.rolPermisos, { nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE" })
   @JoinColumn({ name: "idPermiso" })
   permiso: PermisosEntity;
}