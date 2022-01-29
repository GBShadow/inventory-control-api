import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export default class DeleteProductsService {
  constructor(private productRepository: ProductsRepository) {}

  async execute(id: number) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return this.productRepository.delete(product.id);
  }
}
