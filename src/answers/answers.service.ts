import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from './classes';
import { CreateAnswerDto, UpdateAnswerDto } from './dtos';
import { answerModelName } from './schemas/answer.schema';
import { encuestaModelName } from '../encuestas/schemas/encuesta.schema';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(answerModelName)
    private readonly productModel: Model<Answer>,
    @InjectModel(encuestaModelName)
    private readonly encuestaModel: Model<Answer>,
  ) {}

  async getAnswers() {
    return await this.productModel.find({ isActive: true });
  }

  async getAnswer(_id: string) {
    return await this.productModel.findOne({ _id, isActive: true });
  }

  async createAnswer(answer: CreateAnswerDto) {
    // return await this.productModel.create(answer);
    return await this.encuestaModel.create(answer);
  }

  async createManyAnswers(answers: any[]) {
    return await this.encuestaModel.insertMany(answers);
    // return await this.productModel.insertMany(answers);
  }

  async updateAnswer(_id: string, answer: UpdateAnswerDto) {
    return await this.productModel.findOneAndUpdate(
      { _id, isActive: true },
      answer,
      { new: true },
    );
  }

  async deleteAnswer(_id: string) {
    return await this.productModel.findOneAndUpdate(
      { _id, isActive: true },
      { isActive: false },
      { new: true },
    );
  }
}
