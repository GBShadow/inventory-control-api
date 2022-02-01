import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../repositories/RoleRepository';

@Injectable()
export default class ListRolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async execute() {
    return await this.roleRepository.findAll();
  }
}
