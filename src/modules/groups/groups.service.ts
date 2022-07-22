import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from 'src/schemas/Group.schema';
import { UserGroupType } from 'src/schemas/UserGroup.schema';
import { UsersGroupsService } from '../users-groups/users-groups.service';
import { UsersService } from '../users/users.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private usersGroupsService: UsersGroupsService,
    private usersService: UsersService
  ) {}

  async create(createGroupDto: CreateGroupDto, username: string) {
    const { name } = createGroupDto;
    const host = await this.usersService.findUserByUsernameWithoutPassword(
      username
    );
    const newGroup = await new this.groupModel({ name, host }).save();
    await this.usersGroupsService.create({
      user: host,
      group: newGroup,
      type: UserGroupType.Host,
    });
    return newGroup;
  }
}
