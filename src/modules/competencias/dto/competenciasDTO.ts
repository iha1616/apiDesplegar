import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompeDto{
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nombreCompetencia: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nombreNSCL : string;

    @IsNotEmpty()
    @ApiProperty()
    codigoCompetencia: number;

    @IsNotEmpty()
    @ApiProperty()
    programasCompetencia: number;

 

}

export class UpdateCompeDto extends PartialType(CreateCompeDto) {}