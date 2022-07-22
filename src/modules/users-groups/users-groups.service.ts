import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiOk } from 'src/common/api';
import { Utils } from 'src/common/utils';
import {
  UserGroup,
  UserGroupDocument,
  UserGroupType,
} from 'src/schemas/UserGroup.schema';
import { UsersService } from '../users/users.service';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { SearchGroupDto } from './dto/search-group.dto';
import { UsersGroupsUtils } from './users-groups.utils';

@Injectable()
export class UsersGroupsService {
  constructor(
    @InjectModel(UserGroup.name)
    private userGroupModel: Model<UserGroupDocument>,
    private usersService: UsersService
  ) {}

  create(createUserGroupDto: CreateUserGroupDto) {
    const createdUserGroup = new this.userGroupModel(createUserGroupDto);
    return createdUserGroup.save();
  }

  async searchGroup(
    searchGroupDto: SearchGroupDto,
    type: UserGroupType,
    username: string
  ) {
    const $match = UsersGroupsUtils.matchSearchUserGroup(
      searchGroupDto,
      type,
      username
    );
    const searchGroupPipeline = [
      {
        $match,
      },
    ];
    const result = await Utils.aggregatePaginate(
      this.userGroupModel,
      searchGroupPipeline,
      searchGroupDto
    );
    return ApiOk(result);
  }
}
