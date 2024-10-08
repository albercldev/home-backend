import {
  ArrayMinSize,
  ArrayUnique,
  IsAscii,
  IsOptional,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class PostUserDto {
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
  @IsOptional()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
    minLength: 8,
    maxLength: 20,
  })
  readonly password: string;

  @ArrayUnique()
  @ArrayMinSize(1)
  @ApiProperty({
    description: 'The roles of the user',
    example: ['admin', 'user'],
    minLength: 1,
    uniqueItems: true,
  })
  readonly roles: string[];
}
