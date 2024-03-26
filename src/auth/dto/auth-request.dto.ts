import { DtoNumber, DtoString } from 'src/share/decorators/decorators';

export class LoginDto {
  @DtoNumber()
  id: number;
  @DtoString()
  password: string;
}
