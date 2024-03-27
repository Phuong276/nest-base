import { DtoNumber, DtoString } from 'src/share/decorators/decorators';

export class LoginDto {
  @DtoNumber()
  id: number;
  @DtoString()
  password: string;
}

export class AuthRegisterDto {
  @DtoString()
  name: string;
  @DtoString()
  email: string;
  @DtoString()
  password: string;
}

export class AuthCredentialsDto {
  @DtoString()
  name: string;
  @DtoString()
  password: string;
}

export class ConfirmRequestDto {
  @DtoString()
  email: string;
  @DtoString()
  code: string;
}
