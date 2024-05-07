import { Injectable } from '@nestjs/common';
import { CreateUser } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update.dto';
import { BadRequestException } from '@nestjs/common'

export interface requerido {
    id:number;
    nombre:string;
    apellido:string;
    edad:number;
    dni:number;
}

@Injectable()
export class LoginService {

    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,){}

    async GetOneUser(id:number): Promise<User>{
        return await this.userRepository.findOneBy({id:id});
    }

    async GetAllUsers(): Promise<User[]>{
        return await this.userRepository.find();
    }

    async UpdateUsers (id:number,EditedUser:UpdateUserDto){
        await this.userRepository.update(id,EditedUser)

    }

    async SignUpUsers (createUser : CreateUser): Promise<User>{
        const newUser = this.userRepository.create(createUser);
        return await this.userRepository.save(newUser);
    }

    public async DeleteUsers(id: number) {
          await this.userRepository.delete(id)
      } 
}