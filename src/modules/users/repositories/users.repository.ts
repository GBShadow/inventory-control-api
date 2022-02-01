import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create({ email, name, password, surname, rolesExists }: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        name,
        password,
        email,
        surname,
        roles: { connect: [...rolesExists] },
      },
      include: { roles: true },
    });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: { roles: true },
    });

    return users;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { roles: true },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: true },
    });

    return user;
  }

  async update(
    id: number,
    { email, name, password, surname, rolesExists }: UpdateUserDto,
  ) {
    const userUpdated = await this.prisma.user.update({
      where: { id },
      data: {
        name,
        password,
        email,
        surname,
        roles: { set: [...rolesExists] },
      },
      include: { roles: true },
    });

    return userUpdated;
  }

  async delete(id: number) {
    return await this.prisma.user.delete({
      where: { id },
      include: { roles: true },
    });
  }
}
