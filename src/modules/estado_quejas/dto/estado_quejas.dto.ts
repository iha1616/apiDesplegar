import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEstadoQuejasDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   nombreEstadoQuejas: string;
}

export class UpdateEstadoQuejasDto extends PartialType(CreateEstadoQuejasDto) {}