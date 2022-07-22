import { Module } from '@nestjs/common';
import { UsersGroupsService } from './users-groups.service';
import { UsersGroupsController } from './users-groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGroup, UserGroupSchema } from 'src/schemas/UserGroup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserGroup.name, schema: UserGroupSchema },
    ]),
  ],
  controllers: [UsersGroupsController],
  providers: [UsersGroupsService],
  exports: [UsersGroupsService],
})
export class UsersGroupsModule {}
