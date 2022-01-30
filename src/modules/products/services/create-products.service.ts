import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export default class CreateProductService {
  constructor(
    private productRepository: ProductsRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async execute({ name, quantity, value, userId }: CreateProductDto) {
    const userExist = await this.userRepository.findById(userId);

    if (!userExist) {
      throw new NotFoundException('User not found.');
    }

    const productAlreadyExist = await this.productRepository.findByName(
      name,
      userExist.id,
    );

    if (productAlreadyExist) {
      throw new BadRequestException('Product already exist.');
    }

    const product = await this.productRepository.create({
      name,
      quantity,
      value,
      userId,
    });

    return product;
  }
}
