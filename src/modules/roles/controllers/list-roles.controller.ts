import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import { RoleEntity } from '../entities/role.entity';
import { ListRolesService } from '../services';

@Controller('roles')
@ApiTags('roles')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export default class ListRolesController {
  constructor(private readonly listRolesService: ListRolesService) {}

  @Get()
  @Roles('ADM')
  @ApiOperation({ summary: 'List roles' })
  @ApiResponse({
    status: 200,
    description: 'List roles success',
    type: RoleEntity,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorRequestSwagger,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async execute() {
    return await this.listRolesService.execute();
  }
}
