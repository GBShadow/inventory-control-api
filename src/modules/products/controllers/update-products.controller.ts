import {
  Controller,
  Body,
  Put,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';

import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProductSwagger } from '../swagger/update-product-swagger';
import { UnauthorizedRequestSwagger } from 'src/shared/helpers/swagger/unauthorized-request.swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import UpdateProductsService from '../services/update-products.service';
import UserRequest from 'src/@types/user-request';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Controller('products')
@ApiTags('products')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export default class UpdateProductsController {
  constructor(private readonly updateProductsService: UpdateProductsService) {}

  @Put(':id')
  @ApiOperation({ summary: 'Update product by id.' })
  @ApiResponse({
    status: 200,
    description: 'Product updated with success.',
    type: UpdateProductSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid type data in params.',
    type: BadRequestSwagger,
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
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
    type: ErrorRequestSwagger,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: UserRequest,
  ) {
    const product = await this.updateProductsService.execute(
      {
        productId: id,
        userId: req.user.id,
      },
      updateProductDto,
    );

    const productSerialized = {
      ...product,
      user: new UserEntity(product.user),
    };

    return productSerialized;
  }
}
