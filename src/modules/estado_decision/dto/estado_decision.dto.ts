import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEstadoDecisionDto {
   @IsNotEmpty()
   @ApiProperty()
   @IsString()
   nombreEstadoDecision: string;
}

export class UpdateEstadoDecisionDto extends PartialType(CreateEstadoDecisionDto) {}