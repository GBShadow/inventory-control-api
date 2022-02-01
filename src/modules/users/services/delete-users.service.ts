import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export default class DeleteUsersService {
  constructor(private userRepository: UsersRepository) {}

  async execute(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.userRepository.delete(user.id);

    return;
  }
}
