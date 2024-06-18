import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
      const { usuario, contraseña } = body;
      return this.authService.login(usuario, contraseña)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
      return req.user;
  }
}
