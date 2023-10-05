import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArchivosProyectoEntity, GruposProyectoEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { CreateGrupoProyectoDto, UpdateGrupoProyectoDto } from './dto/grupo-proyecto.dto';
import { plainToClass } from 'class-transformer';
import { CreateArchivoProyectoDto } from './dto/archivos-proyecto.dto';

@Injectable()
export class GrupoProyectoService {
   constructor(
      @InjectRepository(GruposProyectoEntity) private gruposService: Repository<GruposProyectoEntity>,
      @InjectRepository(ArchivosProyectoEntity) private archivoService: Repository<ArchivosProyectoEntity>
   ) {}

   crearGrupo(grupos: CreateGrupoProyectoDto): Promise<GruposProyectoEntity> {
      const newGrupo = this.gruposService.create(plainToClass(GruposProyectoEntity, grupos));
      return this.gruposService.save(newGrupo);
   }

   listarGrupos(): Promise<GruposProyectoEntity[]> {
      return this.gruposService.find({
         relations: ["fichaGrupo.programaFicha", "fichaGrupo.usuarioFichaDirector"]
      })
   }

   listarGruposFicha(ficha: any): Promise<GruposProyectoEntity[]> {
      return this.gruposService.find({
         where: { fichaGrupo: { codigoFicha: ficha } },
         relations: ["fichaGrupo.programaFicha", "fichaGrupo.usuarioFichaDirector"]
      })
   }

   actualizarGrupo(idGrupoProyecto: any, grupo: UpdateGrupoProyectoDto): Promise<GruposProyectoEntity> {
      const searchGrupo = this.gruposService.findOne({
         where: {idGrupoProyecto}
      })

      if (!searchGrupo) {
         throw new Error("El grupo no existe");
      }
      
      const updateGrupo = this.gruposService.merge(plainToClass(GruposProyectoEntity, searchGrupo), plainToClass(GruposProyectoEntity, grupo));
      return this.gruposService.save(updateGrupo);
   }

   listarGrupo(idGrupoProyecto: any): Promise<GruposProyectoEntity> {
      const searchGrupo = this.gruposService.findOne({ 
         where: { idGrupoProyecto: idGrupoProyecto },
         relations: ["fichaGrupo.programaFicha", "fichaGrupo.usuarioFichaDirector"]
       }, )

      if (!searchGrupo) {
         throw new Error("El grupo no existe");
      }

      return searchGrupo;
   }

   subirArchivo(archivo: CreateArchivoProyectoDto): Promise<ArchivosProyectoEntity> {
      const newArchivo = this.archivoService.create(plainToClass(ArchivosProyectoEntity, archivo));
      return this.archivoService.save(newArchivo)
   }

   listarArchivos(grupoArchivo: any): Promise<ArchivosProyectoEntity[]> {
      return this.archivoService.find({
         where: { grupoArchivo: { idGrupoProyecto: grupoArchivo }},
         relations: ["usuarioArchivo", "competenciaArchivo", "resultadoArchivo", "grupoArchivo"]
      })
   }
}
