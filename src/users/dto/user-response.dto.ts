import { ResDto } from 'src/share/decorators/decorators';

export class ResUserDto {
  @ResDto()
  id: number;
  @ResDto()
  email: string;
  @ResDto()
  name: string;
  @ResDto()
  password: string;
  constructor(data: Partial<ResUserDto>) {
    Object.assign(this, data);
  }
}
