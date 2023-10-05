import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class RolesDto{
    @IsNotEmpty()
    @IsString()
    //* Esto hace que se vea en la página de swagger
    @ApiProperty()
    nombreRol: string

    
}

export class updateRoledto extends PartialType(RolesDto) {}