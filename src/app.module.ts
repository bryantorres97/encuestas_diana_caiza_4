import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MONGODB_URI } from './config/constants.config';
import { AnswersModule } from './answers/answers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ParroquiasModule } from './parroquias/parroquias.module';
import { DataModule } from './data/data.module';
import { EncuestasModule } from './encuestas/encuestas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // .env.development
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
      }),
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(MONGODB_URI),
      }),
      inject: [ConfigService],
    }),

    AnswersModule,

    UsersModule,

    AuthModule,

    ParroquiasModule,

    DataModule,

    EncuestasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
