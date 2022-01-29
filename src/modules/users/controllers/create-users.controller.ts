import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserSwagger } from '../swagger/create-user-swagger';
import { UserEntity } from '../entities/user.entity';
import { UnauthorizedRequestSwagger } from 'src/shared/helpers/swagger/unauthorized-request.swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import CreateUsersService from '../services/create-users.service';

@Controller('users')
@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
export default class CreateUsersController {
  constructor(private readonly createUsersService: CreateUsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiResponse({
    status: 201,
    description: 'User created with success.',
    type: CreateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data.',
    type: BadRequestSwagger,
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
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.createUsersService.execute(createUserDto);

    return new UserEntity(user);
  }
}
