import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./config";
import { DatabaseModule } from "./db/database.module";
import { ComiteModule, EntregaFichaModule, GrupoProyectoModule, PlanMejoramientoModule, QuejasModule } from "./modules";
import { ObservacionesAprendizModule } from './modules/observaciones-aprendiz/observaciones-aprendiz.module';
import { EstadoDecisionModule } from './modules/estado_decision/estado_decision.module';
import { MotivosComiteModule } from './modules/motivos_comite/motivos_comite.module';
import { DecisionComiteModule } from "./modules/decision_comite/decision_comite.module";
import { EstadoQuejasModule } from "./modules/estado_quejas/estado_quejas.module";
import { UsuariosModule } from "./modules/usuarios/usuarios.module";
import { TipoDocumentoModule } from "./modules/tipo-documento/tipo-documento.module";
import { RolesModule } from "./modules/roles/roles.module";
import { ResultadoAprendizajeModule } from "./modules/resultado_aprendizaje/resultado_aprendizaje.module";
import { ProgramasFormativosModule } from "./modules/programas_formativos/programas_formativos.module";
import { ProgramaCoordinacionModule } from "./modules/programa_coordinacion/programa_coordinacion.module";
import { PermisosModule } from "./modules/permisos/permisos.module";
import { FichasModule } from "./modules/fichas/fichas.module";
import { FichaUsuarioModule } from "./modules/ficha-usuario/ficha-usuario.module";
import { CompetenciasModule } from "./modules/competencias/competencias.module";
import { AprendicesModule } from "./modules/aprendices/aprendices.module";
import { AccesoModule } from "./modules/acceso/acceso.module";
import { RolesPermisoModule } from "./modules/roles_permiso/roles_permiso.module";


@Module({
   imports: [ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ".env",
   }), DatabaseModule, AccesoModule, UsuariosModule, GrupoProyectoModule, ComiteModule, QuejasModule, PlanMejoramientoModule, EntregaFichaModule, ObservacionesAprendizModule, EstadoDecisionModule, MotivosComiteModule, DecisionComiteModule, EstadoQuejasModule, TipoDocumentoModule, RolesModule, ResultadoAprendizajeModule, ProgramasFormativosModule, ProgramaCoordinacionModule, PermisosModule, FichasModule, FichaUsuarioModule, CompetenciasModule, AprendicesModule, RolesPermisoModule],
   providers: []
})

export class AppModule {}
