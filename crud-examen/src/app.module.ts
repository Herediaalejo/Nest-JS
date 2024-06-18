import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports:[TypeOrmModule.forRoot({
    type: 'mysql',
    host:'localhost',
    port: 3306,
    username: 'root',
    password: '2314',
    database: 'CrudExamen',
    entities: [Usuario],
    synchronize: true,
    }),UsuariosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
