import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  value: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
