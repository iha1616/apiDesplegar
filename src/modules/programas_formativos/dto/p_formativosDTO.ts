import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePFdto{
    @IsNotEmpty()
     @IsString()
     @ApiProperty()
     nombrePF: string;
     @IsNotEmpty()
     @IsString()
     @ApiProperty()
     abreviaturaPF: string;
     
     @IsNotEmpty()
    @ApiProperty()
    codigoPF: number;

    @IsNotEmpty()
    @ApiProperty()
    trimestres: number;
}

export class UpdatePFdto extends PartialType(CreatePFdto){}