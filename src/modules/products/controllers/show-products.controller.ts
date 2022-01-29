import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShowProductSwagger } from '../swagger/show-product-swagger';
import { UnauthorizedRequestSwagger } from 'src/shared/helpers/swagger/unauthorized-request.swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import ShowProductsService from '../services/show-products.service';
import UserRequest from 'src/@types/user-request';

@Controller('products')
@ApiTags('products')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export default class ShowProductsController {
  constructor(private readonly showProductsService: ShowProductsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Show a product by id. ' })
  @ApiResponse({
    status: 200,
    description: 'Product returned with success.',
    type: ShowProductSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid type data in params.',
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
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
    type: ErrorRequestSwagger,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: UserRequest,
  ) {
    const product = await this.showProductsService.execute({
      productId: id,
      userId: req.user.id,
    });

    return product;
  }
}
