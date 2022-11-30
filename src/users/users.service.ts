import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './classes/';
import { CreateUserDto } from './dtos';
import { userModelName } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(userModelName)
    private readonly userModel: Model<User>,
  ) {}

  async getUsers() {
    return await this.userModel.find({ isActive: true });
  }

  async getUser(user: { _id?: string; email?: string }) {
    return await this.userModel.findOne({ ...user, isActive: true });
  }

  async createUser(user: CreateUserDto) {
    return await this.userModel.create(user);
  }

  async createManyUsers(users: CreateUserDto[]) {
    return await this.userModel.insertMany(users);
  }

  async deleteUser(_id: string) {
    return await this.userModel.findOneAndUpdate(
      { _id, isActive: true },
      { isActive: false },
      { new: true },
    );
  }

  async changeAllUsersPassword(password: string) {
    const users = await this.getUsers();
    const newUsers = users.map(async (user) => {
      user.password = password;
      await user.save();
      return user;
    });

    return await Promise.all(newUsers);
  }
}
