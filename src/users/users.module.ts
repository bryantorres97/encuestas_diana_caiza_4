import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModelName, userSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
