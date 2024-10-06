import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { Point } from './entities/point.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  providers: [PointsService],
  controllers: [PointsController],
})
export class PointsModule {}
