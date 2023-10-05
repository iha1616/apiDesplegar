import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDtoFichasUsua{
    @IsNotEmpty()
    //* Esto hace que se vea en la página de swagger
    @ApiProperty()
    usuario: number;

    @IsNotEmpty()
    @ApiProperty()
    ficha: number;

}

export class UpdateDtoFichasUsua extends PartialType(CreateDtoFichasUsua){}