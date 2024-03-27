import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthCredentialsDto,
  AuthRegisterDto,
  ConfirmRequestDto,
  LoginDto,
} from './dto/auth-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { EModule } from 'src/share/constants/enum';

@Controller(EModule.AUTH)
@ApiTags(EModule.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() authRegisterRequest: AuthRegisterDto) {
    try {
      return this.authService.registerUser(authRegisterRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('login/cognito')
  async loginCognito(@Body() authenticateRequest: AuthCredentialsDto) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('confirm')
  async confirm(@Body() confirm: ConfirmRequestDto) {
    try {
      return await this.authService.confirmUser(confirm);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
