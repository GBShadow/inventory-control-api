import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { ShowUserSwagger } from '../swagger/show-user-swagger';
import { UnauthorizedRequestSwagger } from 'src/shared/helpers/swagger/unauthorized-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import ListUsersService from '../services/list-users.service';
import { User } from '@prisma/client';

@Controller('users')
@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
export default class ListUsersController {
  constructor(private readonly listUsersService: ListUsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all users.' })
  @ApiResponse({
    status: 200,
    description: 'List of user returned with success.',
    type: ShowUserSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Not authorized.',
    type: UnauthorizedRequestSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden resource.',
    type: ErrorRequestSwagger,
  })
  async findAll() {
    const users = await this.listUsersService.execute();

    return users.map((user: User) => new UserEntity(user));
  }
}
