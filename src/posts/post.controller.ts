import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { EModule } from 'src/share/constants/enum';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResPostDto } from './dto/post-response.dto';
import { BasePagination } from 'src/share/untils/basePagination';
import { CreatePostDto, UpdatePostDto } from './dto/post-request.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller(EModule.POST)
@ApiTags(EModule.POST)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: ResPostDto })
  async getOne(@Param('id') id: string) {
    return this.postService.getOne({ id: Number(id) });
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [ResPostDto] })
  async getMany(@Query() pagination: BasePagination) {
    return this.postService.getMany({ pagination });
  }

  @Post('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: ResPostDto })
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost({ createPostDto });
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: ResPostDto })
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost({
      id: +id,
      updatePostDto,
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost({ id: +id });
  }
}
