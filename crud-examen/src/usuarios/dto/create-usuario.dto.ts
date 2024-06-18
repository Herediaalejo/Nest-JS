import { IsEmail, IsNotEmpty, IsString } from "class-validator"
export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    usuario: string

    @IsString()
    @IsNotEmpty()
    contraseña: string 
}
