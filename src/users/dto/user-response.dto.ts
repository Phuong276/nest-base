import { ResDto } from 'src/share/decorators/decorators';

export class ResUserDto {
  @ResDto()
  id: number;
  @ResDto()
  email: string;
  @ResDto()
  name: string;
  constructor(data: Partial<ResUserDto>) {
    Object.assign(this, data);
  }
}
