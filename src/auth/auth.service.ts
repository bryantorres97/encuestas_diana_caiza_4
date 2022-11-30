import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { userModelName } from '../users/schemas/user.schema';
import { User } from '../users/classes/user.class';
import { ConfigService } from '@nestjs/config';
import { IUser } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(userModelName) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne<IUser>({ email, isActive: true });
    if (user && (await user.comparePassword(password))) return user;
    return null;
  }

  login(user: any) {
    const payload = { sub: user._id, profile: user.profile };
    delete user._id;
    return { user, accessToken: this.jwtService.sign(payload) };
  }

  async getTokenForUser(email: string) {
    const user = await this.userModel.findOne<IUser>({ email, isActive: true });
    if (!user) return null;
    const payload = { sub: user._id };
    return {
      email,
      name: user.name,
      token: this.jwtService.sign(payload, { expiresIn: '300s' }),
    };
  }

  async validateToken(token: string) {
    return this.jwtService.verify(token, {
      ignoreExpiration: false,
      secret: this.config.get<string>('JWT_SECRET'),
    });
  }
}
