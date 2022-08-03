import { Controller, Get, UseGuards, Query, Post, Body } from '@nestjs/common';
import { UsersGroupsService } from './users-groups.service';
import { SearchGroupDto } from './dto/search-group.dto';
import { UserGroupType } from 'src/schemas/UserGroup.schema';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/users.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JoinGroupDto } from './dto/join-group.dto';

@Controller('users-groups')
@ApiTags('users-groups')
export class UsersGroupsController {
  constructor(private readonly usersGroupsService: UsersGroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('hostedGroup')
  @ApiBearerAuth()
  searchHostedGroup(
    @Query() searchGroupDto: SearchGroupDto,
    @CurrentUser() user
  ) {
    return this.usersGroupsService.searchGroup(
      searchGroupDto,
      UserGroupType.Host,
      user.username
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('joinedGroup')
  @ApiBearerAuth()
  searchJoinedGroup(
    @Query() searchGroupDto: SearchGroupDto,
    @CurrentUser() user
  ) {
    return this.usersGroupsService.searchGroup(
      searchGroupDto,
      UserGroupType.Participant,
      user.username
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  joinGroup(@Body() joinGroupDto: JoinGroupDto, @CurrentUser() user) {
    return this.usersGroupsService.joinGroup(joinGroupDto, user.username);
  }
}
