import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  HttpException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/users.decorator';
import { ParseObjectIdPipe } from 'src/common/pipe/parse-objectid.pipe';
import { ApiOkType } from 'src/common/api';

@Controller('groups')
@ApiTags('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(
    @Body() createGroupDto: CreateGroupDto,
    @CurrentUser() user
  ): Promise<HttpException | ApiOkType> {
    return this.groupsService.create(createGroupDto, user.username);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findGroupById(@Param('id', new ParseObjectIdPipe()) groupId: string) {
    return groupId;
  }
}
