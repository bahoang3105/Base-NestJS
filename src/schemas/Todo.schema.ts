import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { User } from './User.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type TodoDocument = Todo & Document;

export enum TodoStatus {
  PENDING = 'PENDING',
  RESOLVE = 'RESOLVE',
}

@Schema({
  timestamps: true,
})
export class Todo {
  @Prop({ type: User })
  createdUser: User;

  @Prop({ type: User })
  assigner: User;

  @Prop({ type: String })
  content: string;

  @Prop({ type: Date })
  finishTime: Date;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ enum: TodoStatus })
  status: TodoStatus;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
TodoSchema.plugin(paginate);
TodoSchema.plugin(aggregatePaginate);
