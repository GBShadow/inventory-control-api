import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { ShowUserSwagger } from '../swagger/show-user-swagger';
import { UnauthorizedRequestSwagger } from 'src/shared/helpers/swagger/unauthorized-request.swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import ShowUsersService from '../services/show-users.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export default class ShowUsersController {
  constructor(private readonly showUsersService: ShowUsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Show a user by id. ' })
  @ApiResponse({
    status: 200,
    description: 'User returned with success.',
    type: ShowUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid type data in params.',
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
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    type: ErrorRequestSwagger,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.showUsersService.execute(id);

    return new UserEntity(user);
  }
}
