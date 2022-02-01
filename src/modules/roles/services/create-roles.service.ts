import { Injectable, ConflictException } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RoleRepository } from '../repositories/RoleRepository';

@Injectable()
export default class CreateRolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async execute(data: CreateRoleDto) {
    const roleExist = await this.roleRepository.findByName(data.name);

    if (roleExist) {
      throw new ConflictException('Role already registered');
    }

    const role = this.roleRepository.create(data);

    return role;
  }
}
