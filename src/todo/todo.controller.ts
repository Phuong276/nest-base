import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.request';

@Controller('todo')
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({
    description: 'Api create detail.',
    summary: 'Api create detail.',
  })
  createDetail(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createDetail(createTodoDto);
  }

  @Get()
  @ApiOperation({
    description: 'Api get list.',
    summary: 'Api get list.',
  })
  getList() {
    return this.todoService.getList();
  }

  @Get('/:id')
  @ApiOperation({
    description: 'Api get detail.',
    summary: 'Api get detail.',
  })
  getDetail(@Param('id') id: number) {
    return this.todoService.getDetail(id);
  }

  @Put('/:id')
  @ApiOperation({
    description: 'Api update detail.',
    summary: 'Api update detail.',
  })
  updateDetail(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateDetail(id, updateTodoDto);
  }

  @Delete('/:id')
  @ApiOperation({
    description: 'Api delete detail.',
    summary: 'Api delete detail.',
  })
  deleteDetail(@Param('id') id: number) {
    return this.todoService.deleteDetail(id);
  }
}
