import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create({ email, name, password, phone }: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name,
        password,
        email,
        phone,
      },
    });

    return user;
  }

  async findAll(): Promise<User[] | []> {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async update(
    id: number,
    { email, name, password, phone }: UpdateUserDto,
  ): Promise<User> {
    const userUpdated = await this.prisma.user.update({
      where: { id },
      data: {
        name,
        password,
        email,
        phone,
      },
    });

    return userUpdated;
  }

  async delete(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
