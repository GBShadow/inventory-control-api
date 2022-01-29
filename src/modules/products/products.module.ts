import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { UsersRepository } from '../users/repositories/users.repository';
import {
  CreateProductsController,
  DeleteProductsController,
  ListProductsController,
  ShowProductsController,
  UpdateProductsController,
} from './controllers';
import { ProductsRepository } from './repositories/products.repository';
import {
  DeleteProductService,
  ListProductService,
  ShowProductService,
  CreateProductService,
  UpdateProductService,
} from './services';

@Module({
  controllers: [
    CreateProductsController,
    ShowProductsController,
    ListProductsController,
    DeleteProductsController,
    UpdateProductsController,
  ],
  providers: [
    UsersRepository,
    ProductsRepository,
    PrismaService,
    CreateProductService,
    ShowProductService,
    ListProductService,
    DeleteProductService,
    UpdateProductService,
  ],
})
export class ProductsModule {}
