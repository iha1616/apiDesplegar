import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FichaUsuariosEntity, FichasEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { ProgramasFormativosService } from '../programas_formativos/programas_formativos.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateDtoFichas, UpdateDtoFichas } from './dto/createfichasDto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class FichasService {
    constructor(@InjectRepository(FichasEntity) private FichaRepository : Repository<FichasEntity>, private Pformativo : ProgramasFormativosService, private Usuario : UsuariosService){}

    async createFichas(fichas : CreateDtoFichas){
        const fichasFound = await this.FichaRepository.findOne({
            where:{
                codigoFicha :fichas.codigoFicha
            }
        })

        if(fichasFound){
            return new HttpException('Código de ficha ya esta registrado', 400)
        }

      //   const usuarioFound =  await this.Usuario.getUsuario(fichas.usuarioFichaDirector)
        
      //   if(!usuarioFound){
            // return new HttpException('Usuario no encontrado', 404)
      //   }

        const pfFound = await this.Pformativo.getPF(fichas.programaFicha)

        if(!pfFound){
            return new HttpException('Programa formativo no encontrado', 400)
        }

        
        const newFicha = this.FichaRepository.create(plainToClass(FichasEntity,fichas))
        return this.FichaRepository.save(newFicha);
    }

    getFichas(){
        return this.FichaRepository.find({
            relations : ['programaFicha', 'usuarioFichaDirector']
        });
    }
    async getFicha(idFicha: any){

        const fichaFound = await this.FichaRepository.findOne({
            where:{ codigoFicha: idFicha },
            relations : ['programaFicha', 'usuarioFichaDirector']
        });

        if(!fichaFound){
            return new HttpException('Ficha no encontrada', 404)
        }
        return fichaFound;
    }

    async updateFicha(idFicha: any, ficha: UpdateDtoFichas){
        const searchFicha = await this.FichaRepository.findOne({
           where: { idFicha }
        })
  
        if (!searchFicha) {
            return new HttpException('Ficha no encontrada', 404)
        }
  
        const updateF = this.FichaRepository.merge(searchFicha, plainToClass(FichasEntity, ficha));
        return this.FichaRepository.save(updateF);
     }


}
