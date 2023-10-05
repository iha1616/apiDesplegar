import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDecisionComiteDto {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   nombreDecision: string;
}

export class UpdateDecisionComiteDto extends PartialType(CreateDecisionComiteDto) {}