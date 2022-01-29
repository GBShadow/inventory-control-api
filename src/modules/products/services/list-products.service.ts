import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export default class ListProductsService {
  constructor(private productRepository: ProductsRepository) {}

  async execute(userId: number): Promise<Product[] | []> {
    const products = await this.productRepository.findAllByUserId(userId);

    return products;
  }
}
