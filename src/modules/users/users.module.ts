import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import {
  CreateUsersController,
  DeleteUsersController,
  ListUsersController,
  ShowUsersController,
  UpdateUsersController,
} from './controllers';
import { UsersRepository } from './repositories/users.repository';
import {
  DeleteUserService,
  ListUserService,
  ShowUserService,
} from './services';
import CreateUsersService from './services/create-users.service';
import UpdateUsersService from './services/update-users.service';

@Module({
  controllers: [
    CreateUsersController,
    ShowUsersController,
    ListUsersController,
    DeleteUsersController,
    UpdateUsersController,
  ],
  providers: [
    UsersRepository,
    PrismaService,
    CreateUsersService,
    ShowUserService,
    ListUserService,
    DeleteUserService,
    UpdateUsersService,
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
