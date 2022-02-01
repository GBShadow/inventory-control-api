import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '../repositories/RoleRepository';

@Injectable()
export default class DeleteRolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async execute(id: number) {
    const roleExist = await this.roleRepository.findById(id);

    if (!roleExist) {
      throw new NotFoundException('Role not found');
    }

    await this.roleRepository.remove(id);
  }
}
