import {
  IsAlphanumeric,
  IsAscii,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateDeploymentDto {
  @ApiProperty({
    example: 'my-deployment',
    description: 'The name of the deployment',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @IsAscii()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'my-repository',
    description: 'The name of the repository used for cloning',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @IsAscii()
  @MaxLength(50)
  repository: string;

  @ApiProperty({
    example: 'my-repository-owner',
    description: 'The name of the repository used for cloning',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MaxLength(50)
  repositoryOwner: string;

  @ApiProperty({
    example: 'production',
    description: 'The environment of the deployment',
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty()
  @IsAscii()
  @MaxLength(2000)
  environment: string;
}
