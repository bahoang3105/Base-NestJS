import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { SearchUserDto } from './dto/search-user.dto';
import { SearchGroupDto } from './dto/search-group.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('search')
  searchUser(@Query() searchUserDto: SearchUserDto) {
    return this.usersService.searchUser(searchUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('hostedGroup/search')
  searchHostedGroup(@Query() searchHostedGroupDto: SearchGroupDto) {
    return this.usersService.searchHostedGroup(searchHostedGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('joinedGroup/search')
  searchJoinedGroup(@Query() searchJoinedGroupDto: SearchGroupDto) {
    return this.usersService.searchJoinedGroup(searchJoinedGroupDto);
  }
}
