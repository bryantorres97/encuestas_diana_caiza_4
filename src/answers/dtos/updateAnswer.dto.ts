import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnswerDto {
  @ApiProperty({ required: true })
  zona: string;
  @ApiProperty({ required: true })
  parroquia: string;
  @ApiProperty({ required: true })
  edad: number;
  @ApiProperty({ required: true })
  genero: string;
  @ApiProperty({ required: true })
  estadoCivil: string;
  @ApiProperty({ required: true })
  pregunta1: string;
  @ApiProperty({ required: true })
  pregunta2: string;
  @ApiProperty({ required: true })
  pregunta3: string;
  @ApiProperty({ required: true })
  pregunta4: string;
  @ApiProperty({ required: true })
  pregunta5: string;
  @ApiProperty({ required: true })
  pregunta6: string;
  @ApiProperty({ required: true })
  pregunta7: string;
  @ApiProperty({ required: true })
  pregunta8: string;
  @ApiProperty({ required: true })
  pregunta9: string;
  @ApiProperty({ required: true })
  lng: number;
  @ApiProperty({ required: true })
  lat: number;
  @ApiProperty({ required: true })
  user: string;
}
