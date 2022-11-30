import { Module } from '@nestjs/common';
import { EncuestasService } from './encuestas.service';
import { EncuestasController } from './encuestas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { encuestaModelName, encuestaSchema } from './schemas/encuesta.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: encuestaModelName,
        useFactory: () => {
          const schema = encuestaSchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [EncuestasService],
  controllers: [EncuestasController],
  exports: [EncuestasService],
})
export class EncuestasModule {}
