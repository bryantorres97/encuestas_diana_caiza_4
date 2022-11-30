import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Auth, User } from '../common/decorators';
import { User as UserEntity } from '../users/classes';
import { Response } from 'express';
import { getError } from '../common/helpers/manageErrors.helper';
import { LoginDTO } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() credentials: LoginDTO, @User() user: UserEntity) {
    this.logger.log(`Login user: ${user.email}`);
    const data = this.authService.login(user);
    return data;
  }

  @Auth()
  @Get('profile')
  async profile(@User() user: UserEntity) {
    return user;
  }

  @Get('verify/:id')
  async validateToken(@Res() res: Response, @Param('id') id: string) {
    try {
      this.logger.log(`Validating token: ${id.substring(0, 10)}...`);
      await this.authService.validateToken(id);
      return res.json({ isValid: true, message: 'Está autorizado' });
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }

  @Auth()
  @Get('renew')
  async renewToken(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return data;
  }
}
