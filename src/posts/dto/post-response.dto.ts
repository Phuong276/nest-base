import { ResDto } from 'src/share/decorators/decorators';

export class ResPostDto {
  @ResDto()
  id: number;
  @ResDto()
  title: string;
  @ResDto()
  content: string;
  @ResDto()
  published: boolean;
  @ResDto()
  authorId: number;
  constructor(data: Partial<ResPostDto>) {
    Object.assign(this, data);
  }
}
