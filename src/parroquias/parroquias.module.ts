import { Module } from '@nestjs/common';
import { ParroquiasController } from './parroquias.controller';

@Module({
  controllers: [ParroquiasController]
})
export class ParroquiasModule {}
