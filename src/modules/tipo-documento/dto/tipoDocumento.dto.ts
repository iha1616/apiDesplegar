import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class TDocumentoDto{
    @IsNotEmpty()
    @IsString()
    //* Esto hace que se vea en la página de swagger
    @ApiProperty()
    nombreTipoDocumento: string;
}

export class UpdateTipoDto extends PartialType(TDocumentoDto) {}