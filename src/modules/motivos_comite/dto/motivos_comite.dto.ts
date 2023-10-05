import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMotivoComiteDto {
   @IsNotEmpty()
   @IsString()
   @ApiProperty()
   nombreMotivo: string;
}

export class UpdateMotivoComiteDto extends PartialType(CreateMotivoComiteDto) {}