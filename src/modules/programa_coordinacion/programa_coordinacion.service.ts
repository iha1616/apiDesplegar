import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PCAEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { ProgramasFormativosService } from '../programas_formativos/programas_formativos.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreatePCAdto, UpdatePCADto } from './dto/PCdto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProgramaCoordinacionService {
    constructor(@InjectRepository(PCAEntity) private PCArepository: Repository<PCAEntity>,
    private PFService : ProgramasFormativosService,
    private UsuarioService : UsuariosService
    ){}

    async createPCA(pca: CreatePCAdto){
        const pfFound = await this.PFService.getPF(pca.programaFormativo)
        if(!pfFound){
            return new HttpException('Programa formativo no encontrado', 400)
        }

      //   const usuarioFound = await this.UsuarioService.getUsuario(pca.usuario)

      //   if(!usuarioFound){
            // return new HttpException('Usuaro no encontrado', 400)
      //   }

        const newPCA = this.PCArepository.create(plainToClass(PCAEntity, pca))
        return this.PCArepository.save(newPCA);


    }

    getByProgramaF(id: any): Promise<PCAEntity[]> {
      return this.PCArepository.find({
         where: { programaFormativo: { idProgramaFormativo: id } },
         relations: ['programaFormativo', 'usuario']
      })
    }


    getPCAS(){
        return this.PCArepository.find({
            relations: ['programaFormativo', 'usuario']
        })
    }

    async getPCA(id: number){
        const pcaFound = await this.PCArepository.findOne({
            where:{
                idPCA : id
                
            },
            relations : ['programaFormativo', 'usuario']
        });

        if(!pcaFound){
            return new HttpException('Programa coordinación no encontrado', 404)
        }
        return pcaFound;

    }


    async updatePCA(idPCA: any, pca: UpdatePCADto){
        const PCA = await this.PCArepository.findOne({
           where: { idPCA }
        })
  
        if (!PCA) {
            return new HttpException('Programa coordinación no encontrado', 404)
        }
  
        const updateRA = this.PCArepository.merge(PCA, plainToClass(PCAEntity, pca));
        return this.PCArepository.save(updateRA);
     }
}
