import { DtoBoolean, DtoString } from 'src/share/decorators/decorators';

export class CreatePostDto {
  @DtoString()
  title: string;
  @DtoString()
  content: string;
  @DtoString()
  email: string;
  @DtoBoolean()
  published: boolean;
}

export class UpdatePostDto extends CreatePostDto {}
