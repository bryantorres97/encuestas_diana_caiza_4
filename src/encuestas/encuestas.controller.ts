import { Controller, Get, Logger, Res } from '@nestjs/common';
import { Response } from 'express';
import { EncuestasService } from './encuestas.service';
import { getError } from '../common/helpers/manageErrors.helper';

@Controller('encuestas')
export class EncuestasController {
  logger = new Logger('EncuestasController');
  constructor(private readonly encuestasService: EncuestasService) {}

  @Get()
  async getEncuestas(@Res() res: Response) {
    try {
      this.logger.log('Getting encuestas');
      const encuestas = await this.encuestasService.getEncuestas();
      return res.json(encuestas);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }
}
