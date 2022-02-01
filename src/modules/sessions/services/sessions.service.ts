import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateSessionDto } from '../dto/create-session.dto';
import { UsersRepository } from '../../users/repositories/users.repository';

@Injectable()
export class SessionsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create({ username, password }: CreateSessionDto) {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Incorrect e-mail/password combination');
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect e-mail/password combination');
    }

    const userSerialized = {
      id: user.id,
      name: user.name,
      username: user.username,
      roles: user.roles.map((role) => role.name),
    };

    return {
      user: userSerialized,
      token: this.jwtService.sign({ sub: user.id }),
    };
  }
}
