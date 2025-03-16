import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PointsService } from './points.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Points')
@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all points' })
  findAll() {
    return this.pointsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get point by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id') id: string) {
    return this.pointsService.findOneById(+id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new point' })
  @ApiBody({
    description: 'Create a new point',
    type: CreatePointDto,
    examples: {
      point: {
        summary: 'Create a new point',
        value: {
          name: 'My Point',
          address: '123 Main St',
          type: 'park',
          latitude: 37.7749,
          longitude: -122.4194,
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  create(@Body() createPointDto: CreatePointDto, @Request() req) {
    return this.pointsService.create(createPointDto, req.user);
  }

  @Put(':id/approve')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve a point' })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  approve(@Param('id') id: number, @Request() req) {
    return this.pointsService.approve(id, req.user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a point' })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id') id: number,
    @Body() updatePointDto: UpdatePointDto,
    @Request() req,
  ) {
    return this.pointsService.update(id, updatePointDto, req.user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a point' })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: number) {
    return this.pointsService.remove(id);
  }
}
