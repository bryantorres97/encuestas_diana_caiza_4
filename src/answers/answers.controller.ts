import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Patch,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AnswersService } from './answers.service';
import { getError } from '../common/helpers/manageErrors.helper';
import { CreateAnswerDto, CreateManyAnswersDto, UpdateAnswerDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { User as UserEntity } from '../users/classes';
import { EncuestasService } from '../encuestas/encuestas.service';

@ApiTags('Answers')
@Controller('answers')
export class AnswersController {
  logger = new Logger('AnswersController');
  constructor(
    private readonly answersService: AnswersService,
    private readonly encuestasService: EncuestasService,
  ) {}

  @Get()
  async getAnswers(@Res() res: Response) {
    try {
      this.logger.log('Getting answers');
      const answers = await this.answersService.getAnswers();
      return res.json(answers);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get(':id')
  async getAnswer(@Res() res: Response, @Param('id') _id: string) {
    try {
      this.logger.log(`Getting answer ${_id}`);
      const answer = await this.answersService.getAnswer(_id);
      if (!answer)
        throw new NotFoundException('No se ha encontrado la respuesta');
      return res.json(answer);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Patch()
  async limpiandoDatos(@Res() res: Response) {
    try {
      this.logger.log(`Limpieza`);
      const answers = await this.answersService.getAnswers();
      let encuestasLimpiadas = 0;
      for (let i = 0; i < answers.length; i++) {
        encuestasLimpiadas++;
        const element = answers[i];
        console.log('element', element);
        const encuestas = this.limpiarData(element);
        const encuestasRegistradas =
          await this.encuestasService.createEncuestas(encuestas);
        if (encuestasLimpiadas == answers.length) {
          console.log('Limpiadas', encuestasLimpiadas);
          return res.json(encuestasRegistradas);
        }
      }
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Post()
  async createAnswer(@Res() res: Response, @Body() answer: CreateAnswerDto) {
    try {
      this.logger.log(`Creating answer ${JSON.stringify(answer, null, 2)}`);
      const newAnswer = await this.answersService.createAnswer(answer);
      if (!newAnswer)
        throw new BadRequestException('No se ha podido crear la respuesta');
      return res.json(newAnswer);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Post('many')
  async createManyAnswers(@Res() res: Response, @Body() answers: any) {
    try {
      this.logger.log(`Creating many answers`, answers);
      if (answers['data'] == 'null') {
        return res.status(400).json({ message: 'No hay datos' });
      }
      const answersParsed: any[] = JSON.parse(answers['data']);
      const newAnswers = answersParsed.map((answer) => {
        return {
          ...answer,
          user: answers['userid'],
        };
      });

      const createdAnswers = await this.answersService.createManyAnswers(
        newAnswers,
      );
      return res.json({ ok: true, createdAnswers });
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Put(':id')
  async updateAnswer(
    @Res() res: Response,
    @Param('id') _id: string,
    @Body() answer: UpdateAnswerDto,
  ) {
    try {
      this.logger.log(
        `Updating answer ${_id} ${JSON.stringify(answer, null, 2)}`,
      );
      const updatedAnswer = await this.answersService.updateAnswer(_id, answer);
      if (!updatedAnswer)
        throw new BadRequestException(
          'No se ha podido actualizar la respuesta',
        );
      return res.json(updatedAnswer);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Delete(':id')
  async deleteAnswer(@Res() res: Response, @Param('id') _id: string) {
    try {
      this.logger.log(`Deleting answer ${_id}`);
      const deletedAnswer = await this.answersService.deleteAnswer(_id);
      if (!deletedAnswer)
        throw new BadRequestException('No se ha podido eliminar la respuesta');
      return res.json(deletedAnswer);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  // @Get('limpieza')
  // async limpieza(@Res() res: Response) {
  //   try {
  //     this.logger.log(`Limpieza`);
  //     const answers = await this.answersService.getAnswers();
  //     let encuestasLimpiadas = 0;
  //     for (let i = 0; i < answers.length; i++) {
  //       encuestasLimpiadas++;
  //       const element = answers[i];
  //       const encuestas = this.limpiarData(element['data']);
  //       const encuestasRegistradas =
  //         await this.encuestasService.createEncuestas(encuestas);
  //       if (encuestasLimpiadas == answers.length) {
  //         console.log('Limpiadas', encuestasLimpiadas);
  //         return res.json(encuestasRegistradas);
  //       }
  //     }
  //   } catch (error) {
  //     this.logger.error(error);
  //     const errorData = getError(error);
  //     res.status(errorData.statusCode).json(errorData);
  //   }
  // }

  limpiarData(info: any) {
    // eslint-disable-next-line prefer-const
    let data = info.data
      .replace(/\[/g, '')
      .replace(/\]/g, '')
      .replace(/\{/g, '')
      .replace(/\}/g, '');

    const dataSuelta = data.split(',');

    const cantidadEncuestas = dataSuelta.length / 16;
    console.log(cantidadEncuestas);

    const encuestas = [];
    console.log('data', data);

    while (dataSuelta.length > 0) {
      const encuesta = dataSuelta.splice(0, 16);
      const encuestaObj = {
        user: encuesta[0].split(':')[1],
        latitud: Number(encuesta[1].split(':')[1]) || 0,
        altitud: Number(encuesta[2].split(':')[1]) || 0,
        longitud: Number(encuesta[3].split(':')[1]) || 0,
        zona: encuesta[4].split(':')[1] || '',
        parroquia: encuesta[5].split(':')[1] || '',
        edad: Number(encuesta[6].split(':')[1]) || '',
        genero: encuesta[7].split(':')[1] || '',
        pregunta1: encuesta[8].split(':')[1] || '',
        pregunta2: encuesta[9].split(':')[1] || '',
        pregunta3: encuesta[10].split(':')[1] || '',
        pregunta4: encuesta[11].split(':')[1] || '',
        pregunta5: encuesta[12].split(':')[1] || '',
        pregunta6: encuesta[13].split(':')[1] || '',
        pregunta7: encuesta[14].split(':')[1] || '',
        pregunta8: encuesta[15].split(':')[1] || '',
      };
      encuestas.push(encuestaObj);
    }
    return encuestas;
  }
}
