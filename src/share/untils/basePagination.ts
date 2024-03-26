import { ApiProperty } from '@nestjs/swagger';
import { DtoNumber } from '../decorators/decorators';

export class BasePagination {
  @ApiProperty({ name: 'limit', example: 20 })
  @DtoNumber({ required: true })
  limit: number;
  @ApiProperty({ name: 'page', example: 1 })
  @DtoNumber({ required: true })
  page: number;
}
