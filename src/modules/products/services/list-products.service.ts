import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export default class ListProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(userId: number): Promise<Product[] | []> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const roleAdm = user.roles.some((role) => role.name === 'ADM');

    if (roleAdm) {
      const products = await this.productsRepository.findAll();

      return products;
    }

    const products = await this.productsRepository.findAllByUserId(userId);

    return products;
  }
}
