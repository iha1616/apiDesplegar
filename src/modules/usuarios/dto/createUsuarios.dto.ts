import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class createUsuarioDto {
     @IsNotEmpty()
     //* Esto hace que se vea en la página de swagger
     @ApiProperty()
    // @MinLength(10)
    //@MaxLength(10)
     documento: number;

     @IsNotEmpty()
     @IsString()
     @ApiProperty()
     nombre: string;

     @IsNotEmpty()
     @IsString()
     @ApiProperty()
     apellidos: string;

     @IsNotEmpty()
     @IsString()
     @ApiProperty()
     email: string;

     @IsNotEmpty()
     @ApiProperty()
     telefono: number;
          
     @IsNotEmpty()
     @ApiProperty()
     tipoDocumentoUsuario: number;

     @IsNotEmpty()
     @ApiProperty()
     rolUsuario: number;
}

export class updateUsuarioDto extends PartialType(createUsuarioDto) {}