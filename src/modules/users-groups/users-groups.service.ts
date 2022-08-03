import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { ApiError, ApiOk, ApiOkType } from 'src/common/api';
import { Utils } from 'src/common/utils';
import {
  UserGroup,
  UserGroupDocument,
  UserGroupType,
} from 'src/schemas/UserGroup.schema';
import { GroupsService } from '../groups/groups.service';
import { UsersService } from '../users/users.service';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { JoinGroupDto } from './dto/join-group.dto';
import { SearchGroupDto } from './dto/search-group.dto';
import { UsersGroupsUtils } from './users-groups.utils';

@Injectable()
export class UsersGroupsService {
  constructor(
    @InjectModel(UserGroup.name)
    private userGroupModel: Model<UserGroupDocument>,
    @Inject(forwardRef(() => GroupsService))
    private groupsService: GroupsService,
    private usersService: UsersService
  ) {}

  create(createUserGroupDto: CreateUserGroupDto): Promise<
    UserGroup &
      Document & {
        _id: Types.ObjectId;
      }
  > {
    const createdUserGroup = new this.userGroupModel(createUserGroupDto);
    return createdUserGroup.save();
  }

  async searchGroup(
    searchGroupDto: SearchGroupDto,
    type: UserGroupType,
    username: string
  ): Promise<HttpException | ApiOkType> {
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
    try {
      const result = await Utils.aggregatePaginate(
        this.userGroupModel,
        searchGroupPipeline,
        searchGroupDto
      );
      return ApiOk(result);
    } catch (e) {
      return ApiError('E54', 'error');
    }
  }

  async joinGroup(
    joinGroupDto: JoinGroupDto,
    username: string
  ): Promise<HttpException | ApiOkType> {
    const user = await this.usersService.findUserByUsernameWithoutPassword(
      username
    );
    try {
      const group = await this.groupsService.findGroupById(
        joinGroupDto.groupId
      );
      if (group instanceof HttpException) {
        throw new Error();
      } else {
        const joinedUser = new this.userGroupModel({
          user,
          group: group.data,
          type: UserGroupType.Participant,
        });
        return ApiOk(await joinedUser.save());
      }
    } catch (e) {
      console.log(e);
      return ApiError('E6', 'Error Join Group');
    }
  }
}
