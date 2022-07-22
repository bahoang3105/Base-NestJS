import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/User.schema';
import { UserUtils } from 'src/modules/users/user.utils';
import { Utils } from 'src/common/utils';
import { ApiOk } from 'src/common/api';
import { SignupDto } from '../auth/dto/signup.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: SignupDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findUserByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async findUserByUsernameWithoutPassword(username: string) {
    const user = await this.userModel.findOne({ username });
    if (user) {
      user.password = undefined;
    }
    return user;
  }

  async searchUser(searchUserDto: SearchUserDto) {
    const $match = UserUtils.matchSearchUser(searchUserDto);
    const searchUserPipeline = [
      {
        $match,
      },
      {
        $project: {
          password: 0,
        },
      },
    ];
    const result = await Utils.aggregatePaginate(
      this.userModel,
      searchUserPipeline,
      searchUserDto
    );
    return ApiOk(result);
  }
}
