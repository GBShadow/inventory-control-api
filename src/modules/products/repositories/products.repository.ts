import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    name,
    quantity,
    value,
    userId,
  }: CreateProductDto): Promise<Product> {
    const product = await this.prisma.product.create({
      data: {
        name,
        quantity,
        value,
        userId,
      },
      include: { user: true },
    });

    return product;
  }

  async findAllByUserId(userId: number): Promise<Product[] | []> {
    const products = await this.prisma.product.findMany({
      where: { userId },
      include: { user: true },
    });

    return products;
  }

  async findById(id: number): Promise<Product | undefined> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { user: true },
    });

    return product;
  }

  async findByName(name: string, userId: number): Promise<Product | undefined> {
    const products = await this.prisma.product.findMany({
      where: { userId },
      include: { user: true },
    });

    const product = products.find((prod) => prod.name === name);

    return product;
  }

  async update(
    id: number,
    { name, quantity, value }: UpdateProductDto,
  ): Promise<Product> {
    const productUpdated = await this.prisma.product.update({
      where: { id },
      data: {
        name,
        quantity,
        value,
      },
      include: { user: true },
    });

    return productUpdated;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });

    return;
  }
}
