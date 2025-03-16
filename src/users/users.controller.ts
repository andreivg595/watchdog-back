import {
  Controller,
  Get,
  Put,
  Body,
  Delete,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/auth/enums/role.enum';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  findOne(@Param('id') id: string, @Request() req) {
    if (req.user.id !== +id && req.user.role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have access to this resource');
    }
    return this.usersService.findOneById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.user.id !== +id && req.user.role !== Role.ADMIN) {
      throw new ForbiddenException('You can only update your own data');
    }
    return this.usersService.update(+id, updateUserDto, req.user.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  remove(@Param('id') id: string, @Request() req) {
    if (req.user.id !== +id && req.user.role !== Role.ADMIN) {
      throw new ForbiddenException('You can only delete your own account');
    }
    return this.usersService.remove(+id);
  }
}
