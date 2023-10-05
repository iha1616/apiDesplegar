import { IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateComiteDto {
   @IsNotEmpty()
   @ApiProperty()
   fechaHoraInicio: Date

   @IsNotEmpty()
   @ApiProperty()
   fechaHoraFin: Date
   
   @IsNotEmpty()
   @ApiProperty()
   codigoComite: string;

   @IsNotEmpty()
   @ApiProperty()
   pcaComite: number;

   @IsNotEmpty()
   @ApiProperty()
   link: string;

   @ApiProperty()
   estadoComite?: number;
   
   @ApiProperty()
   acta?: string;
   
   @ApiProperty()
   resolucion?: string;
}

export class UpdateComiteDto extends PartialType(CreateComiteDto) {
}