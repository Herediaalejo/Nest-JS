import { PartialType } from '@nestjs/mapped-types';
import { CreateUser } from './create.dto';

export class UpdateUserDto extends PartialType(CreateUser) {}