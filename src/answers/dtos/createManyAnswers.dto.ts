import { ApiProperty } from '@nestjs/swagger';
import { CreateAnswerDto } from './createAnswer.dto';

export class CreateManyAnswersDto {
  @ApiProperty({ type: [CreateAnswerDto] })
  answers: CreateAnswerDto[];
}
