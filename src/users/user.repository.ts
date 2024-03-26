import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user-request.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(params: { createUserDto: CreateUserDto }) {
    const { createUserDto } = params;
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
      },
    });
  }

  async getOne(params: { id: number }) {
    const { id } = params;
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
