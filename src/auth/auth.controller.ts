import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { EModule } from 'src/share/constants/enum';

@Controller(EModule.AUTH)
@ApiTags(EModule.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
