import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput, UpdateUserInput } from 'src/inputs/user.input';
import { UserPayload } from 'src/payloads/user.payload';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(body: CreateUserInput): Promise<UserPayload> {
    const createdUser = new this.userModel(body);
    const user = await createdUser.save();
    return user;
  }

  async findOneByID(userId: string): Promise<UserPayload> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with id:${userId} not found `);
    }
    return user;
  }

  async findOneByUsername(username: string): Promise<UserPayload | undefined> {
    return this.userModel.findOne({ username });
  }

  async findOneByEmail(email: string): Promise<UserPayload> {
    return this.userModel.findOne({ email });
  }

  async findAll(): Promise<UserPayload[]> {
    return this.userModel.find();
  }

  async updateOne(id: string, payload: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, payload);
  }

  async deleteOne(id: string): Promise<unknown> {
    return this.userModel.findByIdAndDelete(id);
  }
}
