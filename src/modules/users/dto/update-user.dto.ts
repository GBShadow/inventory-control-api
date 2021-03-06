import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  surname: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  username: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  old_password?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  password?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional()
  roles?: string[];

  rolesExists: { id: number }[];
}
