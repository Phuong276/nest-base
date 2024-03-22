import {
  DtoBoolean,
  DtoNumber,
  DtoString,
} from 'src/share/decorators/decorators';

export class CreateTodoDto {
  @DtoString()
  string: string;
  @DtoNumber()
  number: number;
  @DtoBoolean()
  boolean: boolean;
}

export class UpdateTodoDto {
  @DtoString()
  value1: string;
}
