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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { getError } from '../common/helpers/manageErrors.helper';
import { CreateUserDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Res() res: Response) {
    try {
      this.logger.log('Getting users');
      const users = await this.usersService.getUsers();
      return res.json(users);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Get(':id')
  async getUser(@Res() res: Response, @Param('id') _id: string) {
    try {
      this.logger.log(`Getting user ${_id}`);
      const user = await this.usersService.getUser({ _id });
      if (!user) throw new NotFoundException('No se ha encontrado el usuario');
      return res.json(user);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Post()
  async createUser(@Res() res: Response, @Body() user: CreateUserDto) {
    try {
      this.logger.log(`Creating user ${JSON.stringify(user, null, 2)}`);
      const existsUser = await this.usersService.getUser({ email: user.email });
      if (existsUser)
        throw new BadRequestException(
          'El usuario con el email ingresado ya existe',
        );
      const newUser = await this.usersService.createUser(user);
      if (!newUser)
        throw new BadRequestException('No se ha podido crear el usuario');
      return res.json(newUser);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Post('many')
  async createManyUsers(@Res() res: Response, @Body() users: CreateUserDto[]) {
    try {
      this.logger.log(`Creating many users ${JSON.stringify(users, null, 2)}`);
      const newUsers = await this.usersService.createManyUsers(users);
      if (!newUsers)
        throw new BadRequestException('No se han podido crear los usuarios');
      return res.json(newUsers);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Put('password')
  async changeAllUsersPassword(
    @Res() res: Response,
    @Body('password') password: string,
  ) {
    try {
      this.logger.log(`Changing all users password`);
      const users = await this.usersService.changeAllUsersPassword(password);
      if (!users)
        throw new BadRequestException('No se ha podido cambiar la contraseña');
      return res.json(users);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }

  @Delete(':id')
  async deleteUser(@Res() res: Response, @Param('id') _id: string) {
    try {
      this.logger.log(`Deleting user ${_id}`);
      const user = await this.usersService.deleteUser(_id);
      if (!user) throw new NotFoundException('No se ha encontrado el usuario');
      return res.json(user);
    } catch (error) {
      this.logger.error(error);
      const errorData = getError(error);
      res.status(errorData.statusCode).json(errorData);
    }
  }
}
