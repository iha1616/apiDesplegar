import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetenciaEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { ProgramasFormativosService } from '../programas_formativos/programas_formativos.service';
import { CreateCompeDto, UpdateCompeDto } from './dto/competenciasDTO';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CompetenciasService {

    constructor(@InjectRepository(CompetenciaEntity) private CompeRepository: Repository<CompetenciaEntity>,
    private PFService : ProgramasFormativosService
    ){}

    async createCompetencia(competencia: CreateCompeDto){
      //   const CompetenciaFound = await this.CompeRepository.findOne({
      //       where:{
      //           nombreCompetencia : competencia.nombreCompetencia
      //       }
      //   })

      //   if(CompetenciaFound){
      //       return new HttpException('Competencia ya registrada', 400)
      //   }

        const codigoFound =  await this.CompeRepository.findOne({
            where:{
                codigoCompetencia :competencia.codigoCompetencia
            }
        })
        
        if(codigoFound){
            return new HttpException('Código ya registrado', 404)
        }

        const PFFound = await this.PFService.getPF(competencia.programasCompetencia)

        if(!PFFound){
            return new HttpException('Programa formativo no encontrado', 400)
        }
        const newCompe = this.CompeRepository.create(plainToClass(CompetenciaEntity, competencia))
        return this.CompeRepository.save(newCompe);

    }


    getCompetencias(){
        return this.CompeRepository.find({
            relations: ['programasCompetencia', 'resultadosCompetencia']
        })
    }

    getCompetenciasPrograma(id: any): Promise<CompetenciaEntity[]> {
      return this.CompeRepository.find({
         where: { programasCompetencia: { idProgramaFormativo: id } },
         relations: ['programasCompetencia', 'resultadosCompetencia']
      })
    }

    async getCompetencia(id: number){
        const CompeFound = await this.CompeRepository.findOne({
            where:{
                idCompetencia : id
            },
            relations: ['programasCompetencia', 'resultadosCompetencia']
        });

        if(!CompeFound){
            return new HttpException('Competencia no encontrada', 404)
        }
        return CompeFound;

    }


    async updateCompetencia(idCompetencia: any, competencia: UpdateCompeDto){
        const searchCompe = await this.CompeRepository.findOne({
           where: { idCompetencia }
        })
  
        if (!searchCompe) {
            return new HttpException('Competencia no encontrada', 404)
        }
  
        const updateCompe = this.CompeRepository.merge(searchCompe, plainToClass(CompetenciaEntity, competencia));
        return this.CompeRepository.save(updateCompe);
     }

     async getCompePf(id: any): Promise<CompetenciaEntity[]> {
      return this.CompeRepository.find({
         where: { programasCompetencia: { idProgramaFormativo: id } },
         relations: ["aprendizQueja.fichaAprendiz", "usuarioQueja", "motivoQueja", "estadoQueja", "comiteQueja", "decisionQueja", "competenciaQueja.programasCompetencia", "resultadoAQueja"]
      })
   }

    }

