import { Injectable } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.request';

@Injectable()
export class TodoService {
  createDetail(createTodoDto: CreateTodoDto) {
    return (
      'Api create detail: ' +
      createTodoDto.string +
      createTodoDto.number +
      createTodoDto.number
    );
  }

  getList() {
    return 'Api get list';
  }

  getDetail(id: number) {
    return 'Api get detail: ' + id;
  }

  updateDetail(id: number, updateTodoDto: UpdateTodoDto) {
    return 'Api update detail: ' + id + ' ' + updateTodoDto.value1;
  }

  deleteDetail(id: number) {
    return 'Api delete detail: ' + id;
  }
}
