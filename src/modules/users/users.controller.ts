import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { SearchUserDto } from './dto/search-user.dto';
import { SearchGroupDto } from './dto/search-group.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('search')
  searchUser(@Query() searchUserDto: SearchUserDto) {
    return this.usersService.searchUser(searchUserDto);
  }

  // @Get('hostedGroup/search')
  // searchHostedGroup(@Query() searchHostedGroupDto: SearchGroupDto) {
  //   return this.usersService.searchHostedGroup(searchHostedGroupDto);
  // }

  // @Get('joinedGroup/search')
  // searchJoinedGroup(@Query() searchJoinedGroupDto: SearchGroupDto) {
  //   return this.usersService.searchJoinedGroup(searchJoinedGroupDto);
  // }
}
