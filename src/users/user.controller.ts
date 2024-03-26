import { Body, Controller, Post } from '@nestjs/common';
import { EModule } from 'src/share/constants/enum';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user-request.dto';
import { ResUserDto } from './dto/user-response.dto';

@Controller(EModule.USER)
@ApiTags(EModule.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({ type: ResUserDto })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser({ createUserDto });
  }
}
