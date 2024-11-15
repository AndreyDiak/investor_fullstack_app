import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import { Role } from 'src/common/entities/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  // @Prop()
  // bio: string;

  @Prop()
  roles: string[];

  @Prop()
  refreshToken: string;

  @Prop()
  gamePlayed: number;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
