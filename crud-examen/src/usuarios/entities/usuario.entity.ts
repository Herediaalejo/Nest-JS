import { TypeOrmModule } from "@nestjs/typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ({name: 'Usuario'})

export class Usuario {
    @PrimaryGeneratedColumn({type:'int',})
    id:number;

    @Column ({ type: 'varchar'})
    usuario: string;

    @Column ({type: 'varchar'})
    contraseña: string;
}

