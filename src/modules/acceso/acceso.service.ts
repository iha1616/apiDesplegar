import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccesoEntity, AprendicesEntity, RolesPermisosEntity, UsuariosEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { CreateDtoAcceso, LoginDTO, updateDtoAcceso } from './dto/createDtoAcces';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ForgotPasswordDto } from './dto/olvidoPassword.dto';
import * as nodemailer from 'nodemailer';
import { ResetPasswordDto } from './dto/reestablecerPassword.dto';
import * as schedule from 'node-schedule';

@Injectable()
export class AccesoService {
   constructor(
      @InjectRepository(AccesoEntity) private accesoService: Repository<AccesoEntity>,
      @InjectRepository(UsuariosEntity) private usuarioService: Repository<UsuariosEntity>,
      @InjectRepository(AprendicesEntity) private aprendizService: Repository<AprendicesEntity>,
      @InjectRepository(RolesPermisosEntity) private rolesPermisosService: Repository<RolesPermisosEntity>,
   ) { }

   async createAcceso(acceso: CreateDtoAcceso): Promise<AccesoEntity> {
      const saltRounds = 10

      acceso.password = await bcrypt.hash(acceso.password, saltRounds);
      const create = this.accesoService.create(plainToClass(AccesoEntity, acceso));
      return this.accesoService.save(create);
   }

   getAccesoDocumento(documento: number): Promise<AccesoEntity> {
      return this.accesoService.findOne({
         where: { documento }
      })
   }

   async getPermissionsUser(idRol: number) {
      const permissions = await this.rolesPermisosService.find({
         where: { rol: { idRol: idRol } },
         relations: ['rol', 'permiso']
      })

      const filterPermissions = permissions.filter(item => item.permiso.link === null)
      const dataPermissions = filterPermissions.map(item => {
         return {
            access: item.access,
            subModulo: item.permiso.subModulo,
            nombrePermiso: item.permiso.nombrePermiso,
         }
      })

      return dataPermissions
   }

   async loginValidate(accesoUser: LoginDTO) {
      const validateDocumento = await this.getAccesoDocumento(accesoUser.documento);

      if (!validateDocumento) {
         const error = {
            error: "Documento no encontrado",
            label: "documento",
            status: false,
         }
         return error
      }

      const validatePassword = bcrypt.compareSync(accesoUser.password, validateDocumento.password);
      if (!validatePassword) {
         const error = {
            error: "Contraseña incorrecta",
            label: "password",
            status: false,
         }
         return error
      }

      var dataToken = {}
      const secretKey = "shh"

      if (validateDocumento.tablaAcceso === 1) {
         const userToken = await this.usuarioService.findOne({
            where: { documento: validateDocumento.documento },
            relations: ['tipoDocumentoUsuario', 'rolUsuario', 'quejasUsuarios', 'quejasUsuarios.comiteQueja']
         });

         const dataPermissions = await this.getPermissionsUser(userToken.rolUsuario.idRol)

         dataToken = {
            userInfo: userToken,
            userAccess: {
               idAcceso: validateDocumento.idAcceso,
               documento: validateDocumento.documento,
               idUsuarioAprendiz: validateDocumento.idUsuarioAprendiz
            },
            permissions: dataPermissions
         }
      } else if (validateDocumento.tablaAcceso === 2) {
         const userToken = await this.aprendizService.findOne({
            where: { documento: validateDocumento.documento },
            relations: ['tipoDocumentoAprendiz', 'rolAprendiz', 'fichaAprendiz.usuarioFichaDirector', 'fichaAprendiz.programaFicha', 'grupoAprendiz', 'quejasAprendices', 'quejasAprendices.comiteQueja' ]
         });
         if (userToken.estadoAprendiz === 0) {
            const error = {
               error: "No tienes acceso",
               label: "",
               status: false,
            }
            return error
         }

         const dataPermissions = await this.getPermissionsUser(userToken.rolAprendiz.idRol)

         dataToken = {
            userInfo: userToken,
            userAccess: {
               idAcceso: validateDocumento.idAcceso,
               documento: validateDocumento.documento,
               idUsuarioAprendiz: validateDocumento.idUsuarioAprendiz,
            },
            permissions: dataPermissions
         }
      }
      // console.log("Valor jwt:", jwt)
      const token = jwt.sign(dataToken, secretKey, { expiresIn: "1h" });
      const data = {
         token,
         userSave: dataToken
      }
      return data;
   }

   async recoveryPassword(recoveryDto: ForgotPasswordDto) {
      const { documento } = recoveryDto;
      const acceso = await this.accesoService.findOne({
         where: { documento },
      });

      if (!acceso) {
         throw new HttpException('Documento no encontrado para recuperar contraseña', 404);
      }

      let email: string;

      if (acceso.tablaAcceso == 1) {
         const usuario = await this.usuarioService.findOne({
            where: { documento }
         });

         if (!usuario) {
            throw new HttpException('Usuario no encontrado', 404);
         }

         email = usuario.email;

      } else if (acceso.tablaAcceso == 2) {
         const aprendiz = await this.aprendizService.findOne({
            where: { documento }
         });

         if (!aprendiz) {
            throw new HttpException('Aprendiz no encontrado', 404);
         }

         email = aprendiz.email;
      }

      //codigo aletorio
      const recoveryCode = this.generateRecoveryCode();

      acceso.forgotPassword = recoveryCode;
      await this.accesoService.save(acceso);

      
   const expirationDate = new Date(Date.now() + 3600000); 

   schedule.scheduleJob(expirationDate, async () => {
      
      const existingCode = await this.accesoService.findOne({
         where: { forgotPassword: recoveryCode },
      });

      if (existingCode) {
         acceso.forgotPassword = null;
         await this.accesoService.save(acceso);
         console.log('Código de recuperación expirado y eliminado.');
      }
   });
      
      // lo envio por correo
      await this.sendRecoveryCodeEmail(email, recoveryCode);
      return { message: 'Código de recuperación enviado con éxito' };

      
   }


   async resetPassword(recuperar: ResetPasswordDto): Promise<{ message: string }> {
      const acceso = await this.accesoService.findOne({
         where: { forgotPassword: recuperar.forgotPassword },
      });

      if (!acceso) {
         throw new HttpException('Código de recuperación no válido', 400);
      }

      // Encriptando
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(recuperar.newPassword, saltRounds);

      // Actualizo
      acceso.password = hashedPassword;
      acceso.forgotPassword = null; // Borro
      await this.accesoService.save(acceso);

      return { message: 'Contraseña actualizada con éxito' };
   }


   private generateRecoveryCode(): string {
      // Generando un # aleatorio de 7 dígitos
      const min = 1000000;
      const max = 9999999;
      const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

      // Formatea el número como una cadena de texto de 7 dígitos (agregando ceros a la izquierda si es necesario)
      const formattedCode = randomCode.toString().padStart(7, '0');

      return formattedCode;
   }

   private async sendRecoveryCodeEmail(email: string, recoveryCode: string): Promise<void> {
      const transporter = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
            user: 'senastionrgnl@gmail.com',
            pass: 'stbt trqr dhcg sgsg',
         },
      });

      const mailOptions = {
         from: 'senastionrgnl@gmail.com',
         to: email,
         subject: 'Restablecer Contraseña Senastion',
         text: `¡Hola, ${email}!\n\n
          Por favor, no compartir este código con nadie más. El código expira en 1 hora.\n\n
          Tu código de recuperación es: ${recoveryCode}`,
      };

      // Envía el correo
      try {
         await transporter.sendMail(mailOptions);
         console.log(`Correo electrónico de recuperación enviado a ${email}`);
      } catch (error) {
         console.error('Error al enviar el correo electrónico de recuperación:', error);
         throw new HttpException('No se pudo enviar el correo electrónico de recuperación', 500);
      }
   }
}
