import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userModelName, userSchema } from '../users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { ConfigService } from '@nestjs/config';
import { JWT_EXPIRATION_TIME, JWT_SECRET } from '../config/constants.config';
import { LocalStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: userModelName,
        useFactory: () => {
          const schema = userSchema;
          return schema;
        },
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(JWT_SECRET),
        signOptions: { expiresIn: config.get<string>(JWT_EXPIRATION_TIME) },
      }),
    }),
    UsersModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
