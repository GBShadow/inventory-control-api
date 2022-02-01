import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, description }: CreateRoleDto) {
    const role = await this.prisma.role.create({
      data: { name, description },
    });

    return role;
  }

  async findAll() {
    const roles = await this.prisma.role.findMany();

    return roles;
  }

  async findById(id: number) {
    const role = await this.prisma.role.findUnique({ where: { id } });

    return role;
  }

  async findByName(name: string) {
    const role = await this.prisma.role.findUnique({ where: { name } });

    return role;
  }

  async findAllByName(names: string[]) {
    const roles = await this.prisma.role.findMany({
      where: { name: { in: names } },
      select: { id: true },
    });

    return roles;
  }

  async update(id: number, { name, description }: UpdateRoleDto) {
    const roleUpdated = await this.prisma.role.update({
      where: { id },
      data: { name, description },
    });

    return roleUpdated;
  }

  async remove(id: number) {
    await this.prisma.role.delete({ where: { id } });

    return;
  }
}
