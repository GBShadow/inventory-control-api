import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleEntity } from '../entities/role.entity';
import UpdateRolesService from '../services/update-roles.service';

@Controller('roles')
@ApiTags('roles')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export default class UpdateRoleController {
  constructor(private readonly updateRolesService: UpdateRolesService) {}

  @Put(':id')
  @Roles('ADM')
  @ApiOperation({ summary: 'Update role by id' })
  @ApiResponse({
    status: 200,
    description: 'Update role success',
    type: RoleEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Role already registered',
    type: ErrorRequestSwagger,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async execute(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateRoleDto,
  ) {
    return await this.updateRolesService.execute(id, body);
  }
}
