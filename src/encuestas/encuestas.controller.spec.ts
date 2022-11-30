import { Test, TestingModule } from '@nestjs/testing';
import { EncuestasController } from './encuestas.controller';

describe('EncuestasController', () => {
  let controller: EncuestasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncuestasController],
    }).compile();

    controller = module.get<EncuestasController>(EncuestasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
