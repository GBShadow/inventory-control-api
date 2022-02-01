import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '../repositories/RoleRepository';

@Injectable()
export default class ShowRolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async execute(id: number) {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new NotFoundException('Role not found.');
    }

    return role;
  }
}
