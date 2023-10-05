import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class PermisosDto{
    @IsNotEmpty()
    @IsString()
    //* Esto hace que se vea en la página de swagger
    @ApiProperty()
    nombrePermiso: string
}

export class updatePermisodto extends PartialType(PermisosDto) {}