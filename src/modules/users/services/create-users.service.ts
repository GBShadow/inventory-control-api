import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export default class CreateUsersService {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
    phone,
  }: CreateUserDto): Promise<User> {
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new BadRequestException('User already exist.');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      password: passwordHash,
      email,
      phone,
    });

    return user;
  }
}
