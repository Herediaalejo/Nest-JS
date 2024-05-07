
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './login/user.entity';
import { LoginModule } from './login/registroUsuario.module';

@Module({
  imports: [

      LoginModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'CocaxD',
      entities: [User],
      synchronize: true,
    }),
    
  ],
})
export class AppModule {}