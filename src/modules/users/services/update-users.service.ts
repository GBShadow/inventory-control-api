import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export default class UpdateUsersService {
  constructor(private userRepository: UsersRepository) {}

  async execute(
    id: number,
    { email, name, old_password, password, phone }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (old_password && password) {
      const matchedPassword = await compare(old_password, user.password);

      if (!matchedPassword) {
        throw new BadRequestException('Password does not matched.');
      }

      const passwordHash = await hash(password, 8);

      const userUpdated = await this.userRepository.update(user.id, {
        name,
        password: passwordHash,
        email,
        phone,
      });

      return userUpdated;
    }

    const userUpdated = await this.userRepository.update(user.id, {
      name,
      email,
      phone,
    });

    return userUpdated;
  }
}
