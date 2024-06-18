import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { jwtConstants } from './constants'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async login(nombreUsuario: string, contraseña: string,) {
    
    try {
      // Busca el usuario por nombre de usuario
      const usuario = await this.usersService.findOneByUsername(nombreUsuario);
  
      if (usuario && usuario instanceof Usuario) {
        // Compara la contraseña proporcionada con la almacenada
        const match = await this.usersService.comparePasswords(contraseña, usuario.contraseña);
        
        if (match) {
          // Crea el payload si la contraseña coincide
          const payload = { sub: usuario.id, usuario: usuario.usuario };
  
          // Genera y retorna el token de acceso
          return {
            access_token: await this.jwtService.sign(payload, { 
              secret: jwtConstants.secret,
              expiresIn: '1h' 
            })
          };
        } else {
          return {
            message: "El usuario ingresado es incorrecto. Ingrese las credenciales nuevamente."
          }
        }
      }
    } catch(error) {
      console.log(error)
  }
}
}
