import {IsNotEmpty,IsString  } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class CargaExcelDto{

    @IsNotEmpty()
    @ApiProperty()
    // Excel en Base64 
    data: string;
}