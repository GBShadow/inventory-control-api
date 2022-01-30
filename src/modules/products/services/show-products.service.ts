import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';

type IRequest = {
  productId: number;
  userId: number;
};

@Injectable()
export default class ShowProductsService {
  constructor(private productRepository: ProductsRepository) {}

  async execute({ productId, userId }: IRequest) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (product.userId !== userId) {
      throw new UnauthorizedException(
        'User does not have permission to view this product.',
      );
    }

    return product;
  }
}
