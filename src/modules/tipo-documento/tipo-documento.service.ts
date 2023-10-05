import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoDocumentoEntity } from '../../db/entities/usuarios/tipo_documento.entity';
import { Repository } from 'typeorm';
import { TDocumentoDto, UpdateTipoDto } from './dto/tipoDocumento.dto';


@Injectable()
export class TipoDocumentoService {
    constructor(@InjectRepository(TipoDocumentoEntity) private TiposRepository: Repository<TipoDocumentoEntity>) { }

    createTipoDocu(tipo: TDocumentoDto) {
        const newTipo = this.TiposRepository.create(tipo);
        return this.TiposRepository.save(newTipo);
    }

    getTipos() {
        return this.TiposRepository.find();
    }

    getTipo(idTipoDocumento: number) {

        return this.TiposRepository.findOne({
            where: {
                idTipoDocumento
            }
        });
    }

    updateTipos(idTipoDocumento: number, tipo: UpdateTipoDto) {
        return this.TiposRepository.update({ idTipoDocumento}, tipo)
    }
}