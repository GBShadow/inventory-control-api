import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export default class ShowUsersService {
  constructor(private userRepository: UsersRepository) {}

  async execute(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
