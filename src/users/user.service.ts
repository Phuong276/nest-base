import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/user-request.dto';
import { ResUserDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async createUser(params: { createUserDto: CreateUserDto }) {
    const { createUserDto } = params;
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepo.createUser({ createUserDto });
    return user as ResUserDto;
  }

  async getOne(params: { id: number }) {
    const { id } = params;
    const post = await this.userRepo.getOne({ id });
    return post as ResUserDto;
  }
}
