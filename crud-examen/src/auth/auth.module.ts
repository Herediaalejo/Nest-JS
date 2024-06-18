import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsuariosModule],
  providers: [AuthService, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
