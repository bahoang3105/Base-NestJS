import { UserGroupType } from 'src/schemas/UserGroup.schema';
import { SearchGroupDto } from './dto/search-group.dto';

export class UsersGroupsUtils {
  public static matchSearchUserGroup = (
    groupDto: SearchGroupDto,
    userGroupType: UserGroupType,
    username: string
  ): { 'user.username': string; name; createdAt; type } => {
    const { keyword, fromDate, toDate } = groupDto;
    const match = {
      'user.username': username,
      name: undefined,
      createdAt: undefined,
      type: undefined,
    };
    if (keyword) {
      match.name = {
        $regex: keyword,
        $options: 'i',
      };
    }
    if (fromDate && toDate) {
      match.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    } else if (fromDate) {
      match.createdAt = {
        $gte: new Date(fromDate),
      };
    } else if (toDate) {
      match.createdAt = {
        $lte: new Date(toDate),
      };
    }
    if (userGroupType) {
      match.type = userGroupType;
    }
    return match;
  };
}
