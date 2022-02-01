import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { UsersRepository } from '../users/repositories/users.repository';
import {
  CreateRolesController,
  DeleteRolesController,
  ListRolesController,
  ShowRolesController,
  updateRolesController,
} from './controllers';
import { RoleRepository } from './repositories/RoleRepository';
import {
  CreateRolesService,
  DeleteRolesService,
  ListRolesService,
  ShowRolesService,
  updateRolesService,
} from './services';

@Module({
  controllers: [
    CreateRolesController,
    updateRolesController,
    ListRolesController,
    DeleteRolesController,
    ShowRolesController,
  ],
  providers: [
    RoleRepository,
    UsersRepository,
    PrismaService,
    CreateRolesService,
    updateRolesService,
    DeleteRolesService,
    ListRolesService,
    ShowRolesService,
  ],
  exports: [RoleRepository],
})
export class RolesModule {}
