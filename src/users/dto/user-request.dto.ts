import { DtoString } from 'src/share/decorators/decorators';

export class CreateUserDto {
  @DtoString()
  email: string;
  @DtoString()
  name: string;
  @DtoString()
  password: string;
}
