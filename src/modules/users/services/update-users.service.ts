import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { RoleRepository } from 'src/modules/roles/repositories/RoleRepository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export default class UpdateUsersService {
  constructor(
    private userRepository: UsersRepository,
    private rolesRepository: RoleRepository,
  ) {}

  async execute(
    id: number,
    { username, name, old_password, password, surname, roles }: UpdateUserDto,
  ) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const rolesExists = await this.rolesRepository.findAllByName(roles);

    if (rolesExists.length === 0) {
      throw new NotFoundException('Roles not found.');
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
        username,
        surname,
        rolesExists,
      });

      return userUpdated;
    }

    const userUpdated = await this.userRepository.update(user.id, {
      name,
      username,
      surname,
      rolesExists,
    });

    return userUpdated;
  }
}
