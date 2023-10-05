import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateDtoAcceso{
    @IsNotEmpty()
    @ApiProperty()
    documento: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    idUsuarioAprendiz: number;

    @IsNotEmpty()
    @ApiProperty()
    tablaAcceso: number;
}

export class updateDtoAcceso extends PartialType(CreateDtoAcceso){}
export class LoginDTO extends PartialType(CreateDtoAcceso){}