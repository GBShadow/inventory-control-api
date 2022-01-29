import {
  Controller,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedRequestSwagger } from 'src/shared/helpers/swagger/unauthorized-request.swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import DeleteUsersService from '../services/delete-users.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export default class DeleteUsersController {
  constructor(private readonly deleteUsersService: DeleteUsersService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 204,
    description: 'User deleted with success.',
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
  @ApiOperation({ summary: 'Delete a user by id' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteUsersService.execute(id);
  }
}
