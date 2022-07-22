import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './providers/schedule/tasks.module';
import { GroupsModule } from './modules/groups/groups.module';
import { TodosModule } from './modules/todos/todos.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.PORT),
      },
      ttl: Number(process.env.REDIS_TTL),
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    TasksModule,
    GroupsModule,
    TodosModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
