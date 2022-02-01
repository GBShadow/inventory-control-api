import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleRepository } from '../repositories/RoleRepository';

@Injectable()
export default class UpdateRolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async execute(id: number, data: UpdateRoleDto) {
    const roleExist = await this.roleRepository.findById(id);

    if (!roleExist) {
      throw new NotFoundException('Role not found');
    }

    const roleNameExist = await this.roleRepository.findByName(data.name);

    if (roleNameExist) {
      throw new ConflictException('Role already registered');
    }

    const roleUpdated = await this.roleRepository.update(id, data);

    return roleUpdated;
  }
}
