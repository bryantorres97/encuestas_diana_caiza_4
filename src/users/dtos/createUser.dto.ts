import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
}
