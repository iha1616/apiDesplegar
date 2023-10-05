import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';
import { AccesoEntity, AprendicesEntity, ArchivosProyectoEntity, ComiteEntity, CompetenciaEntity, DecisionesComiteEntity, EntregaFichaEntity, EstadoDecisionEntity, EstadoQuejasEntity, FichaUsuariosEntity, FichasEntity, GruposProyectoEntity, MotivosComiteEntity, ObservacionesAprendizEntity, PCAEntity, PermisosEntity, PlanMejoramientoEntity, ProgramasFormativosEntity, QuejasComiteEntity, ResultadoAprendizajeEntity, RolesEntity, RolesPermisosEntity, TipoDocumentoEntity, UsuariosEntity } from './entities';

const entities = [TipoDocumentoEntity, RolesEntity, PermisosEntity, RolesPermisosEntity, EstadoDecisionEntity, MotivosComiteEntity, EstadoQuejasEntity, DecisionesComiteEntity, ProgramasFormativosEntity, CompetenciaEntity, ResultadoAprendizajeEntity, FichasEntity, UsuariosEntity, AprendicesEntity, AccesoEntity, FichaUsuariosEntity, PCAEntity, EntregaFichaEntity, ObservacionesAprendizEntity, QuejasComiteEntity, ComiteEntity, PlanMejoramientoEntity, GruposProyectoEntity, ArchivosProyectoEntity];

@Global()
@Module({
   imports: [
      TypeOrmModule.forRootAsync({
         useFactory: (configService: ConfigType<typeof config>) => {
            const { host, port, user, password, name } = configService.database;
            return {
               type: "mysql",
               host: host,
               port: +port,
               charset: "utf8mb4",
               username: user,
               password: password,
               database: name,
               entities: [...entities],
               autoLoadEntities: true,
               //synchronize: true,
               // logging: true,
            }
         },
         inject: [config.KEY]
      })
   ]
})

export class DatabaseModule {}