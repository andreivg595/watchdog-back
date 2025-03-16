import { IsString, IsEnum, IsOptional, IsDecimal } from 'class-validator';
import { PointStatus } from '../enums/point-status.enum';
import { PointType } from '../enums/point-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePointDto {
  @ApiProperty({ example: 'My Point', description: 'Name of the point' })
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  name?: string;

  @ApiProperty({ example: '123 Main St', description: 'Address of the point' })
  @IsOptional()
  @IsString({ message: 'Address must be a string.' })
  address: string;

  @ApiProperty({ example: 'park', description: 'Type of the point' })
  @IsOptional()
  @IsEnum(PointType, {
    message: 'Invalid point type.',
  })
  type: PointType;

  @ApiProperty({ example: 37.7749, description: 'Latitude of the point' })
  @IsOptional()
  @IsDecimal({}, { message: 'Latitude must be a valid decimal number.' })
  latitude?: number;

  @ApiProperty({ example: -122.4194, description: 'Longitude of the point' })
  @IsOptional()
  @IsDecimal({}, { message: 'Latitude must be a valid decimal number.' })
  longitude?: number;

  @ApiProperty({ example: 'pending', description: 'Status of the point' })
  @IsOptional()
  @IsEnum(PointStatus, {
    message: 'Invalid status value.',
  })
  status?: PointStatus;
}
