import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductSwagger } from '../swagger/create-product-swagger';
import { UnauthorizedRequestSwagger } from 'src/shared/helpers/swagger/unauthorized-request.swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import CreateProductsService from '../services/create-products.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Controller('products')
@ApiTags('products')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export default class CreateProductsController {
  constructor(private readonly createProductsService: CreateProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product.' })
  @ApiResponse({
    status: 201,
    description: 'Product created with success.',
    type: CreateProductSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data.',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Not authorized.',
    type: UnauthorizedRequestSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden resource.',
    type: ErrorRequestSwagger,
  })
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.createProductsService.execute(createProductDto);

    const productSerialized = {
      ...product,
      user: new UserEntity(product.user),
    };

    return productSerialized;
  }
}
