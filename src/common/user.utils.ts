import { SearchGroupDto } from 'src/modules/users/dto/search-group.dto';
import { SearchUserDto } from 'src/modules/users/dto/search-user.dto';

export class UserUtils {
  public static matchSearchUser = (userDto: SearchUserDto) => {
    const { keyword, sex } = userDto;
    const match: any = {};
    if (keyword) {
      match.$or = [
        {
          username: {
            $regex: keyword,
            $options: 'i',
          },
        },
        {
          name: {
            $regex: keyword,
            $options: 'i',
          },
        },
      ];
    }
    if (sex) {
      match.sex = sex;
    }
    return match;
  };

  public static matchSearchGroup = (groupDto: SearchGroupDto, type: string) => {
    const { keyword, fromDate, toDate } = groupDto;
    const match: any = {};
    if (keyword) {
    }
  };
}
