import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePagination } from 'src/share/untils/basePagination';
import { CreatePostDto, UpdatePostDto } from './dto/post-request.dto';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  async getOne(params: { id: number }) {
    const { id } = params;
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  async getMany(params: { pagination: BasePagination }) {
    const { pagination } = params;
    return this.prisma.post.findMany({
      skip: +pagination.page - 1,
      take: +pagination.limit,
    });
  }

  async createPost(params: { createPostDto: CreatePostDto }) {
    const { createPostDto } = params;
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        author: {
          connect: {
            email: createPostDto.email,
          },
        },
        published: createPostDto.published,
      },
    });
  }

  async updatePost(params: { id: number; updatePostDto: UpdatePostDto }) {
    const { id, updatePostDto } = params;
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
        author: {
          connect: {
            email: updatePostDto.email,
          },
        },
        published: updatePostDto.published,
      },
    });
  }

  async deletePost(params: { id: number }) {
    const { id } = params;
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
