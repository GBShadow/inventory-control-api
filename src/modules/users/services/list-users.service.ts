import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export default class ListUsersService {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<User[] | []> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
