import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Usuario} from './entities/usuario.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsuariosService {

  @InjectRepository(Usuario)
  private usuarioRepository: Repository<Usuario>;

  public async hashPassword(contraseña: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
    return hashedPassword;
  }

  
  public async comparePasswords(contraseña: string, hashedPassword: string): Promise<string> {
    return await bcrypt.compare(contraseña, hashedPassword);
 }
 public async create(createUsuarioDto: CreateUsuarioDto) {
  let match = false;
  try {
    const usuarios = await this.usuarioRepository.find();
    for (let userF of usuarios) {
      if (createUsuarioDto.usuario === userF.usuario) {
        match = true;
        break;  // No es necesario seguir buscando si ya encontramos una coincidencia
      }
    }
    if (match) {
      throw new Error('Ya existe un usuario con ese username');
    }
    const newUsuario = createUsuarioDto.usuario;
    const hashedPassword = await this.hashPassword(createUsuarioDto.contraseña);
    await this.usuarioRepository.save({ usuario: newUsuario, contraseña: hashedPassword });
    return {
      statusCode: 200,
      msg: 'El usuario se inserto adecuadamente'
    };
  } catch (error) {
    throw new BadRequestException(error.message);
  }
  }


  public async findAll() {
    try{
      const usuarios = await this.usuarioRepository.find()
      if (usuarios.length > 0){
        return usuarios
      } else{
        return{
          statusCode: 400,
          msg: "No existen usuarios registrados"
        }
      }
    } catch(error){
      return new BadRequestException(error)
    }
  }

  public async findOne(id: number) {
    try{
      const Usuario = await this.usuarioRepository.findOneBy({id:id})
      if (Usuario){
        return Usuario
      } else{
        return{
          statusCode: 400,
          msg: "El usuarios no existe"
        }
      }
    } catch(error){
      return new BadRequestException(error)
    }
  }
  public async findOneByUsername(usuario: string) {
    try{
      const Usuario = await this.usuarioRepository.findOneBy({usuario: usuario})
      if (Usuario) {
        return Usuario
      } else {
        return {
          statusCode: 400,
          msg: "El usuario no existe"
        }
      }
    } catch (error) {
      return new BadRequestException(error)
    }
  }


  public async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try{
      await this.usuarioRepository.update(id, updateUsuarioDto)
      return{
        statusCode: 201,
        msg: 'El usuario se modificó correctamente'
      }
    }catch (error){
      return new BadRequestException(error)
    }
  }

  public async remove(id: number) {
    try{
      await this.usuarioRepository.delete(id)
      return{
        statusCode: 200,
        msg: 'El usuario se elimino correctamente'
      }
    }catch(error){
      return new BadRequestException(error)
    }
  }

public async login(usuario: string, contraseña: string) {
  try{
    let match : any
    let id : any
    const users = await this.usuarioRepository.find()
    for (let user of users) {
      if (usuario === user.usuario) {
        match = await this.comparePasswords(contraseña, user.contraseña)
        if(match){
          id = user.id
        }
      }
    }
    if(!match){
      return {
        statusCode: 401,
        msg: "Credenciales incorrectas"
      }
    }
    const payload = { sub: id, usuario:usuario};
    /* const token = this.authService.generateToken({ username, sub: id }) */
    return {
        statusCode: 200,
        msg: "Inicio de sesión exitoso",
        /* token */
      }
    } catch (error) {
    return new BadRequestException(error)
  }
}
}
