import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePCAdto{
    @IsNotEmpty()
    @ApiProperty()
    programaFormativo: number;

    @IsNotEmpty()
    @ApiProperty()
    usuario: number;

 

}

export class UpdatePCADto extends PartialType(CreatePCAdto) {}