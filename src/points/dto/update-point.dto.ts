import { IsString, IsEnum, IsOptional, IsDecimal } from 'class-validator';
import { PointStatus } from '../enums/point-status.enum';
import { PointType } from '../enums/point-type.enum';

export class UpdatePointDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string.' })
  address: string;

  @IsOptional()
  @IsEnum(PointType, {
    message: 'Invalid point type.',
  })
  type: PointType;

  @IsOptional()
  @IsDecimal({}, { message: 'Latitude must be a valid decimal number.' })
  latitude?: number;

  @IsOptional()
  @IsDecimal({}, { message: 'Latitude must be a valid decimal number.' })
  longitude?: number;

  @IsOptional()
  @IsEnum(PointStatus, {
    message: 'Invalid status value.',
  })
  status?: PointStatus;
}
