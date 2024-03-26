import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/user.service';
import { LoginDto } from './dto/auth-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    const { id, password } = loginDto;

    const user = await this.userService.getOne({
      id,
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new UnauthorizedException('invalid password');
    }

    return {
      token: this.jwtService.sign({
        id,
      }),
      user,
    };
  }
}
