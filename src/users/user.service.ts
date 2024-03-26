import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/user-request.dto';
import { ResUserDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async createUser(params: { createUserDto: CreateUserDto }) {
    const { createUserDto } = params;
    const user = await this.userRepo.createUser({ createUserDto });
    return user as ResUserDto;
  }
}
