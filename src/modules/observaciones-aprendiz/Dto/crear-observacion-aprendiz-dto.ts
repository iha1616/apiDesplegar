import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class crearObservacionAprendizDto {
    @IsNotEmpty()
    @ApiProperty()
    trimestre: number;

    @IsNotEmpty()
    @ApiProperty()
    ObservacionAprendiz: string;

    @IsNotEmpty()
    @ApiProperty()
    aprendizObservacion: number;
    
    @IsNotEmpty()
    @ApiProperty()
    usuarioObservacion: number;

    @IsNotEmpty()
    @ApiProperty()
    decisionObservacion:number;

    @IsNotEmpty()
    @ApiProperty()
    competenciaObservacion: number;

    @IsNotEmpty()
    @ApiProperty()
    resultadoAObservacion: number;

    @IsNotEmpty()
    @ApiProperty()
    entregaObservacion: number;
}

export class actualizarObservacionAprendizDto extends PartialType(crearObservacionAprendizDto) {}