import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateGrupoProyectoDto {
   @IsString()
   @IsNotEmpty()
   @ApiProperty()
   nombreProyecto: string;

   @IsNotEmpty()
   @ApiProperty()
   fichaGrupo: number;
}

export class UpdateGrupoProyectoDto extends PartialType(CreateGrupoProyectoDto) {}