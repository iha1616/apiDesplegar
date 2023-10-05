import { Controller, Get, Post, Put, Param, Body, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AccesoService } from './acceso.service';
import { LoginDTO } from './dto/createDtoAcces';
import { ForgotPasswordDto } from './dto/olvidoPassword.dto';
import { ResetPasswordDto } from './dto/reestablecerPassword.dto';

@Controller('acceso')
export class AccesoController {
   constructor(private accesoService: AccesoService) { }

   @Post('auth')
   async loginValidate(@Body() access: LoginDTO) {
      return await this.accesoService.loginValidate(access);
   }

   @Post('recuperar')
   async recoveryPassword(@Body() recoveryDto: ForgotPasswordDto): Promise<{ message: string }> {
      return this.accesoService.recoveryPassword(recoveryDto);
   }

   @Post('reestablecer')
   async resetPassword(
      @Body() resetPasswordDto: ResetPasswordDto,
   ): Promise<{ message: string }> {
      return this.accesoService.resetPassword(resetPasswordDto);
   }
}
