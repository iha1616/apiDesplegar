import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreatePlanMejoramientoDto {
    @IsNotEmpty()
    @ApiProperty()
    quejaPlanMejoramiento: number;

    @IsNotEmpty()
    @ApiProperty()
    usuarioPlanMejoramiento:number;

    @IsNotEmpty()
    @ApiProperty()
    aprendizPlanMejoramiento:number;

    @IsNotEmpty()
    @ApiProperty()
    trimestre: number;
    
   //  @IsNotEmpty()
    @ApiProperty()
    archivoPlanMejoramiento?: string;
    
   //  @IsNotEmpty()
    @ApiProperty()
    decisionPlanMejoramiento?:number;
    
   //  @IsNotEmpty()
    @ApiProperty()
    motivoPlanMejoramiento?:number;
    
   //  @IsNotEmpty()
    @ApiProperty()
    descripcionMotivo?: string;
}

export class UpdatePlanMejoramientoDTO extends PartialType(CreatePlanMejoramientoDto){
}