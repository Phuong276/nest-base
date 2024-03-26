import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './posts/post.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [TodoModule, PrismaModule, PostModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
