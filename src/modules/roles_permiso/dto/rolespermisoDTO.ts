import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class RolesPermisosDto{
    @IsNotEmpty()
    @ApiProperty()
    rol: number

    @IsNotEmpty()
    @ApiProperty()
    permiso: number

    @IsNotEmpty()
    @ApiProperty()
    access: boolean
}

export class updateRolesPermisodto extends PartialType(RolesPermisosDto) {}