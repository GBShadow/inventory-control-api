import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersRepository: UsersRepository,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return this.matchRoles(user.id, roles);
  }

  private async matchRoles(id: number, roles: string[]) {
    const user = await this.usersRepository.findById(id);

    const userHasRole = user.roles.some((role) => roles.includes(role.name));

    if (userHasRole) {
      return true;
    }

    return false;
  }
}
