import { IsString, IsEnum, IsOptional, IsDecimal } from 'class-validator';
import { PointStatus } from '../enums/point-status.enum';
import { PointType } from '../enums/point-type.enum';

export class UpdatePointDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  name?: string;

  @IsOptional()
  @IsEnum([
    PointType.PIPICAN,
    PointType.DOG_BEACH,
    PointType.VETERINARIAN,
    PointType.WATER_FOUNTAIN,
  ])
  type?: string;

  @IsOptional()
  @IsDecimal({}, { message: 'Latitude must be a valid decimal number.' })
  latitude?: number;

  @IsOptional()
  @IsDecimal({}, { message: 'Latitude must be a valid decimal number.' })
  longitude?: number;

  @IsOptional()
  @IsEnum([PointStatus.PENDING, PointStatus.APPROVED, PointStatus.REJECTED], {
    message: 'Invalid status value.',
  })
  status?: string;
}
