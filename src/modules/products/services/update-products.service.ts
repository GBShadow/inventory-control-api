import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsRepository } from '../repositories/products.repository';

type IRequest = {
  productId: number;
  userId: number;
};

@Injectable()
export default class UpdateProductService {
  constructor(private productRepository: ProductsRepository) {}

  async execute(
    { productId, userId }: IRequest,
    { name, quantity, value }: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (product.userId !== userId) {
      throw new UnauthorizedException(
        'User does not have permission to update this product.',
      );
    }

    const productUpdated = await this.productRepository.update(product.id, {
      name,
      quantity,
      value,
    });

    return productUpdated;
  }
}
