import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { ErrorRequestSwagger } from 'src/shared/helpers/swagger/error-request.swagger';
import { DeleteRolesService } from '../services';

@Controller('roles')
@ApiTags('roles')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export default class DeleteRoleController {
  constructor(private readonly deleteRolesService: DeleteRolesService) {}

  @Delete(':id')
  @Roles('ADM')
  @ApiOperation({ summary: 'Delete role by id' })
  @ApiResponse({ status: 204, description: 'Delete role success' })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorRequestSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async execute(@Param('id', new ParseIntPipe()) id: number) {
    await this.deleteRolesService.execute(id);
  }
}
