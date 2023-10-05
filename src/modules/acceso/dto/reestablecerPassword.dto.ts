import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  forgotPassword: string;

    @IsString()
    @Length(6, 20) // Esto es solo un ejemplo, ajusta la longitud como desees
    newPassword: string;
  }