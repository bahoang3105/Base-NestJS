import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { User } from './User.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type GroupDocument = Group & Document;

@Schema({
  timestamps: true,
})
export class Group {
  @Prop({ type: User })
  host: User;

  @Prop({ type: [String] })
  listTaskId: string[];

  @Prop({ type: [User] })
  listUser: User[];

  @Prop({ type: String })
  name: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
GroupSchema.plugin(paginate);
GroupSchema.plugin(aggregatePaginate);
