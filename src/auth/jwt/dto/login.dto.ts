import { IsAscii, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginDto {
  @IsAscii()
  @Length(3, 20)
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
    minLength: 3,
    maxLength: 20,
  })
  readonly username: string;

  @Length(8, 20)
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
    minLength: 8,
    maxLength: 20,
  })
  readonly password: string;
}
