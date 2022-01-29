import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShowProductSwagger } from '../swagger/show-product-swagger';
import { UnauthorizedRequestSwagger } from 'src/shared/helpers/swagger/unauthorized-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import ListProductsService from '../services/list-products.service';
import UserRequest from 'src/@types/user-request';
import { ProductEntity } from '../entities/products.entity';
import { Product } from '@prisma/client';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Controller('products')
@ApiTags('products')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
export default class ListProductsController {
  constructor(private readonly listProductsService: ListProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List all products.' })
  @ApiResponse({
    status: 200,
    description: 'List of product returned with success.',
    type: ShowProductSwagger,
    isArray: true,
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
  async findAll(@Req() req: UserRequest) {
    const products = await this.listProductsService.execute(req.user.id);

    return products.map((product: ProductEntity) => ({
      ...product,
      user: new UserEntity(product.user),
    }));
  }
}
