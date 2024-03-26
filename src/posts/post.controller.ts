import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { EModule } from 'src/share/constants/enum';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResPostDto } from './dto/post-response.dto';
import { BasePagination } from 'src/share/untils/basePagination';
import { CreatePostDto, UpdatePostDto } from './dto/post-request.dto';

@Controller(EModule.POST)
@ApiTags(EModule.POST)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  @ApiOkResponse({ type: ResPostDto })
  async getOne(@Param('id') id: string) {
    return this.postService.getOne({ id: Number(id) });
  }

  @Get('')
  @ApiOkResponse({ type: [ResPostDto] })
  async getMany(@Query() pagination: BasePagination) {
    return this.postService.getMany({ pagination });
  }

  @Post('')
  @ApiOkResponse({ type: ResPostDto })
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost({ createPostDto });
  }

  @Put(':id')
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
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost({ id: +id });
  }
}
