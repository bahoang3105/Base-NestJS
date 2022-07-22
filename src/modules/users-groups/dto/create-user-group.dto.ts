import { Group } from 'src/schemas/Group.schema';
import { User } from 'src/schemas/User.schema';
import { UserGroupType } from 'src/schemas/UserGroup.schema';

export class CreateUserGroupDto {
  user: User;
  group: Group;
  type: UserGroupType;
}
