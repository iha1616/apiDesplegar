import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateDtoFichas {
   @IsNotEmpty()
   //* Esto hace que se vea en la página de swagger
   @ApiProperty()
   codigoFicha: number;

   @ApiProperty()
   voceroFicha?: string;

   @IsNotEmpty()
   @ApiProperty()
   programaFicha: number;

   @IsNotEmpty()
   @ApiProperty()
   usuarioFichaDirector: number;
}

export class UpdateDtoFichas extends PartialType(CreateDtoFichas) { }