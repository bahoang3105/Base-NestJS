import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersGroupsService } from './users-groups.service';
import { CreateUsersGroupDto } from './dto/create-users-group.dto';
import { UpdateUsersGroupDto } from './dto/update-users-group.dto';

@Controller('users-groups')
export class UsersGroupsController {
  constructor(private readonly usersGroupsService: UsersGroupsService) {}

  @Post()
  create(@Body() createUsersGroupDto: CreateUsersGroupDto) {
    return this.usersGroupsService.create(createUsersGroupDto);
  }

  @Get()
  findAll() {
    return this.usersGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersGroupDto: UpdateUsersGroupDto) {
    return this.usersGroupsService.update(+id, updateUsersGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersGroupsService.remove(+id);
  }
}
