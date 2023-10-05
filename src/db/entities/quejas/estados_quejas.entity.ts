import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuejasComiteEntity } from "..";

@Entity('estado_quejas')
export class EstadoQuejasEntity {
   @PrimaryGeneratedColumn()
   idEstadoQuejas: number;

   @Column()
   nombreEstadoQuejas: string;

   //======== Claves foráneas para otras tablas ========
   @OneToMany(() => QuejasComiteEntity, (quejas) => quejas.estadoQueja)
   quejasEstado: QuejasComiteEntity[];
}