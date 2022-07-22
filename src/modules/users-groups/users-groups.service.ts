import { Injectable } from '@nestjs/common';
import { CreateUsersGroupDto } from './dto/create-users-group.dto';
import { UpdateUsersGroupDto } from './dto/update-users-group.dto';

@Injectable()
export class UsersGroupsService {
  create(createUsersGroupDto: CreateUsersGroupDto) {
    return 'This action adds a new usersGroup';
  }

  findAll() {
    return `This action returns all usersGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersGroup`;
  }

  update(id: number, updateUsersGroupDto: UpdateUsersGroupDto) {
    return `This action updates a #${id} usersGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersGroup`;
  }
}
