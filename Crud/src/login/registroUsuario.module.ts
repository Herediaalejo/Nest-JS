import { Module } from '@nestjs/common';
import { LoginController } from './registroUsuario.controller';
import { LoginService } from './resgistroUsuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({

    imports: [TypeOrmModule.forFeature([User])],

    controllers:[LoginController],

    providers: [LoginService]
})
export class LoginModule {}
