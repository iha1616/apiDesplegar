import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";
export class crearEntregaFichaDto {
    @IsNotEmpty()
    @ApiProperty()
    observacionFicha: number;

    @IsNotEmpty()
    @ApiProperty()
    trimestre: number;

    @IsNotEmpty()
    @ApiProperty()
    usuarioEntregaFicha: number;

    @IsNotEmpty()
    @ApiProperty()
    fichaEntrega: number;
    
    @IsNotEmpty()
    @ApiProperty()
    competenciaEntregaFicha:string;

    @IsNotEmpty()
    @ApiProperty()
    resultadoEntregaFicha: number;

}

export class actualizarEntregaFichaDto extends PartialType(crearEntregaFichaDto) {} 