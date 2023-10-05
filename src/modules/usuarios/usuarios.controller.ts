import { Controller,Get, Post, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosEntity } from 'src/db/entities/usuarios/usuarios.entity';
import { createUsuarioDto, updateUsuarioDto } from './dto/createUsuarios.dto';

@Controller('usuarios')
export class UsuariosController {
    
    constructor(private usuarioService : UsuariosService){}
    
   @Post()
   async createUsuario(@Body() user: createUsuarioDto) {
      return this.usuarioService.createUsuario(user);
   }

    @Get()
    getUsuarios(): Promise<UsuariosEntity[]>{
        return this.usuarioService.getUsuarios();
    }

    @Post(':id')
    updateUsuario(@Param('id', ParseIntPipe)id: number, @Body() user : updateUsuarioDto){
      return this.usuarioService.updateUsuario(id, user)
    }


    @Get("rol/:id")
    async getUsuarioRol(@Param("id", ParseIntPipe) id: number) {
      return await this.usuarioService.getUsuariosRol(id)
    }


}
