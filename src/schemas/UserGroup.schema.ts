import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { Group } from './Group.schema';
import { User } from './User.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type UserGroupDocument = UserGroup & Document;
export enum UserGroupType {
  Host = 'host',
  Participants = 'participant',
}

@Schema({
  timestamps: true,
})
export class UserGroup {
  @Prop({ type: User })
  user: User;

  @Prop({ type: Group })
  group: Group;

  @Prop({ enum: UserGroupType })
  type: UserGroupType;
}

export const UserGroupSchema = SchemaFactory.createForClass(UserGroup);
UserGroupSchema.plugin(paginate);
UserGroupSchema.plugin(aggregatePaginate);
