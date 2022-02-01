import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export default class ListUsersService {
  constructor(private userRepository: UsersRepository) {}

  async execute() {
    const users = await this.userRepository.findAll();

    return users;
  }
}
