import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  value: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  quantity: number;
}
