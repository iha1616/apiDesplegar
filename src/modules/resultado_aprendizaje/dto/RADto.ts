import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRAdto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nombreRA: string;

    @IsNotEmpty()
    @ApiProperty()
    codigoRA: number;

    @IsNotEmpty()
    @ApiProperty()
    competenciaResultado: number;

 

}

export class UpdateRADto extends PartialType(CreateRAdto) {}