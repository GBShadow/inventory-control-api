import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { RoleRepository } from 'src/modules/roles/repositories/RoleRepository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export default class CreateUsersService {
  constructor(
    private userRepository: UsersRepository,
    private rolesRepository: RoleRepository,
  ) {}

  async execute({ email, name, surname, password, roles }: CreateUserDto) {
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new BadRequestException('User already exist.');
    }

    const rolesExists = await this.rolesRepository.findAllByName(roles);

    if (rolesExists.length === 0) {
      throw new NotFoundException('Roles not found.');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      password: passwordHash,
      email,
      surname,
      rolesExists,
    });

    return user;
  }
}
