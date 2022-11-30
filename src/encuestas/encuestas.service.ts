import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Encuesta } from './classes/encuestas.class';
import { encuestaModelName } from './schemas/encuesta.schema';

@Injectable()
export class EncuestasService {
  constructor(
    @InjectModel(encuestaModelName)
    private readonly encuestaModel: Model<Encuesta>,
  ) {}

  async getEncuestas() {
    return await this.encuestaModel.find({ isActive: true }).populate('user');
  }

  async createEncuestas(encuestas: any) {
    return await this.encuestaModel.insertMany(encuestas);
  }
}
