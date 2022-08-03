import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ApiOk, ApiOkType } from 'src/common/api';
import { Group, GroupDocument } from 'src/schemas/Group.schema';
import { UserGroupType } from 'src/schemas/UserGroup.schema';
import { UsersGroupsService } from '../users-groups/users-groups.service';
import { UsersService } from '../users/users.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  private logger: Logger = new Logger(GroupsService.name);
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private usersGroupsService: UsersGroupsService,
    private usersService: UsersService
  ) {}

  async create(
    createGroupDto: CreateGroupDto,
    username: string
  ): Promise<HttpException | ApiOkType> {
    const session = await this.connection.startSession();
    const { name } = createGroupDto;
    let result;
    try {
      await session.withTransaction(async () => {
        const host = await this.usersService.findUserByUsernameWithoutPassword(
          username
        );
        const newGroup = await new this.groupModel({ name, host }).save();
        await this.usersGroupsService.create({
          user: host,
          group: newGroup,
          type: UserGroupType.Host,
        });
        result = newGroup;
        throw new Error('hihi');
      });
      return ApiOk(result);
    } catch (e) {
      this.logger.log('==== CREATE GROUP ERROR ====', e);
    } finally {
      await session.endSession();
    }
  }

  async findGroupById(groupId: string): Promise<HttpException | ApiOkType> {
    return ApiOk(await this.groupModel.findOne({ _id: groupId }));
  }
}
