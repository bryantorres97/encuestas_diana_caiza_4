import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty()
  respuesta: string;
  @ApiProperty()
  latitud: number;
  @ApiProperty()
  longitud: number;
  // @ApiProperty()
  // canton: string;
  // @ApiProperty()
  // parroquia: string;
  // @ApiProperty()
  // edad: number;
  // @ApiProperty()
  // genero: string;
  // @ApiProperty()
  // sector: string;
  // @ApiProperty()
  // pregunta1: string;
  // @ApiProperty()
  // pregunta2: string;
  // @ApiProperty()
  // pregunta3: string;
  // @ApiProperty()
  // pregunta4: string;
  // @ApiProperty()
  // pregunta5: string;
  // @ApiProperty()
  // longitud: number;
  // @ApiProperty()
  // latitud: number;
  // @ApiProperty()
  // user: string;
}
