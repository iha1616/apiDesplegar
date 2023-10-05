import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArchivoProyectoDto {
   @ApiProperty()
   archivoProyecto?: string;

   @ApiProperty()
   @IsNotEmpty()
   nombreArchivo?: string;

   @ApiProperty()
   @IsNotEmpty()
   observacionArchivoProyecto?: string;

   @ApiProperty()
   @IsNotEmpty()
   usuarioArchivo?: number;

   @ApiProperty()
   @IsNotEmpty()
   competenciaArchivo?: number;

   @ApiProperty()
   @IsNotEmpty()
   resultadoArchivo?: number;

   @ApiProperty()
   @IsNotEmpty()
   grupoArchivo?: number;
}

export class UpdateArchivoProyectoDto extends PartialType(CreateArchivoProyectoDto) {}