import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { isStringObject } from 'util/types';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  edad: number;

  @Column()
  dni: number;
  
}