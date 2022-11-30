import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { answerModelName, answerSchema } from './schemas/answer.schema';
import { EncuestasModule } from '../encuestas/encuestas.module';
import { EncuestasService } from '../encuestas/encuestas.service';
import {
  encuestaModelName,
  encuestaSchema,
} from '../encuestas/schemas/encuesta.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: answerModelName,
        useFactory: () => {
          const schema = answerSchema;
          return schema;
        },
      },
      {
        name: encuestaModelName,
        useFactory: () => {
          const schema = encuestaSchema;
          return schema;
        },
      },
    ]),
    EncuestasModule,
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
