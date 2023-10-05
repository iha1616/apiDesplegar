import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultadoAprendizajeEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { CompetenciasService } from '../competencias/competencias.service';
import { CreateRAdto, UpdateRADto } from './dto/RADto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ResultadoAprendizajeService {
    constructor(@InjectRepository(ResultadoAprendizajeEntity) private RArepository: Repository<ResultadoAprendizajeEntity>,
    private CompeService : CompetenciasService
    ){}

    async createRA(ra: CreateRAdto){
      //   const RAFound = await this.RArepository.findOne({
      //       where:{
      //           nombreRA : ra.nombreRA
      //       }
      //   })

      //   if(RAFound){
      //       return new HttpException('Resultado de aprendizaje ya registrado', 400)
      //   }

        const codigoFound =  await this.RArepository.findOne({
            where:{
               codigoRA : ra.codigoRA
            }
        })
        
        if(codigoFound){
            return new HttpException('Código ya registrado', 404)
        }

        const CompeFound = await this.CompeService.getCompetencia(ra.competenciaResultado)

        if(!CompeFound){
            return new HttpException('Competencia no encontrada', 400)
        }
        const newRA = this.RArepository.create(plainToClass(ResultadoAprendizajeEntity, ra))
        return this.RArepository.save(newRA);

    }


    getRAS(){
        return this.RArepository.find({
            relations: ['competenciaResultado']
        })
    }

    getResultadosCompetencia(id: any): Promise<ResultadoAprendizajeEntity[]> {
      return this.RArepository.find({
         where: { competenciaResultado: { idCompetencia: id } },
         relations: ["competenciaResultado"]
      })
    }

    async getRA(id: number){
        const raFound = await this.RArepository.findOne({
            where:{
                idResultadoAprendizaje : id
            },
            relations : ['competenciaResultado']
        });

        if(!raFound){
            return new HttpException('Resultado de aprendizaje no encontrado', 404)
        }
        return raFound;

    }


    async updateRA(idResultadoAprendizaje: any, ra: UpdateRADto){
        const searchRA = await this.RArepository.findOne({
           where: { idResultadoAprendizaje }
        })
  
        if (!searchRA) {
            return new HttpException('Resultado de aprendizaje no encontrado', 404)
        }
  
        const updateRA = this.RArepository.merge(searchRA, plainToClass(ResultadoAprendizajeEntity, ra));
        return this.RArepository.save(updateRA);
     }
}
