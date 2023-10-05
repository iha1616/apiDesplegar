import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramasFormativosEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { CreatePFdto, UpdatePFdto } from './dto/p_formativosDTO';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProgramasFormativosService {
    constructor(@InjectRepository(ProgramasFormativosEntity) private PFRepository : Repository<ProgramasFormativosEntity>){}

    async createPF(pf: CreatePFdto){
        const pfFound = await this.PFRepository.findOne({
            where:{
                nombrePF: pf.nombrePF
            }
        });

        if(pfFound){
            return new HttpException('Programa formativo ya registrado', 404)
        }

        const codigoFound = await this.PFRepository.findOne({
            where:{
                codigoPF: pf.codigoPF
            }
        });

        if(codigoFound){
            return new HttpException('Código ya registrado', 404)
        }

        const newPF = this.PFRepository.create(plainToClass(ProgramasFormativosEntity, pf))
        return this.PFRepository.save(newPF);

    }


    getPFS(){
        return this.PFRepository.find({
         relations:['competenciaPrograma.resultadosCompetencia']
     })
    }

    async getPF(id: number){
        const pfFound = await this.PFRepository.findOne({
            where:{
                idProgramaFormativo:id
            },
            relations:['competenciaPrograma.resultadosCompetencia']
        });

        if (!pfFound) {
            return new HttpException('Programa formativo no encontrado', 404)
            
        }

        return pfFound

    }

    async updatePf(idProgramaFormativo: any, pf: UpdatePFdto){
        const pfSearch = await this.PFRepository.findOne({
            where:{idProgramaFormativo}
        });

        if(!pfSearch){
            return new HttpException('Programa formativo no encontrado', 404)
        };

        const updatePf = this.PFRepository.merge(pfSearch, plainToClass(ProgramasFormativosEntity, pf))
        return this.PFRepository.save(updatePf)


    }


}
