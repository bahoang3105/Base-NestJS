import { forwardRef, Module } from '@nestjs/common';
import { UsersGroupsService } from './users-groups.service';
import { UsersGroupsController } from './users-groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGroup, UserGroupSchema } from 'src/schemas/UserGroup.schema';
import { UsersModule } from '../users/users.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserGroup.name, schema: UserGroupSchema },
    ]),
    UsersModule,
    forwardRef(() => GroupsModule),
  ],
  controllers: [UsersGroupsController],
  providers: [UsersGroupsService],
  exports: [UsersGroupsService],
})
export class UsersGroupsModule {}
