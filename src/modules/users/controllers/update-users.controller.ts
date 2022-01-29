import {
  Controller,
  Body,
  Put,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserSwagger } from '../swagger/update-user-swagger';
import { UserEntity } from '../entities/user.entity';
import { UnauthorizedRequestSwagger } from 'src/shared/helpers/swagger/unauthorized-request.swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import UpdateUsersService from '../services/update-users.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export default class UpdateUsersController {
  constructor(private readonly updateUsersService: UpdateUsersService) {}

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id.' })
  @ApiResponse({
    status: 200,
    description: 'User updated with success.',
    type: UpdateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid type data in params.',
    type: BadRequestSwagger,
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
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    type: ErrorRequestSwagger,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.updateUsersService.execute(id, updateUserDto);

    return new UserEntity(user);
  }
}
