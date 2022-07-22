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
}
