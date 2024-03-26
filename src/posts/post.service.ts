import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { ResPostDto } from './dto/post-response.dto';
import { BasePagination } from 'src/share/untils/basePagination';
import { CreatePostDto, UpdatePostDto } from './dto/post-request.dto';

@Injectable()
export class PostService {
  constructor(private postRepo: PostRepository) {}

  async getOne(params: { id: number }) {
    const { id } = params;
    const post = await this.postRepo.getOne({ id });
    return post as ResPostDto;
  }

  async getMany(params: { pagination: BasePagination }) {
    const { pagination } = params;
    const posts = await this.postRepo.getMany({ pagination });
    return posts as ResPostDto[];
  }

  async createPost(params: { createPostDto: CreatePostDto }) {
    const { createPostDto } = params;
    const post = await this.postRepo.createPost({ createPostDto });
    return post as ResPostDto;
  }

  async updatePost(params: { id: number; updatePostDto: UpdatePostDto }) {
    const { id, updatePostDto } = params;
    const post = await this.postRepo.updatePost({ id, updatePostDto });
    return post as ResPostDto;
  }

  async deletePost(params: { id: number }) {
    const { id } = params;
    const post = await this.postRepo.deletePost({ id });
    return post as ResPostDto;
  }
}
