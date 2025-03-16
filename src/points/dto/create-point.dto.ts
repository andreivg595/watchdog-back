import { IsString, IsDecimal, IsEnum, IsNotEmpty } from 'class-validator';
import { PointType } from '../enums/point-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePointDto {
  @ApiProperty({ example: 'My Point', description: 'Name of the point' })
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @ApiProperty({ example: '123 Main St', description: 'Address of the point' })
  @IsNotEmpty()
  @IsString({ message: 'Address must be a string.' })
  address: string;

  @ApiProperty({ example: 'park', description: 'Type of the point' })
  @IsNotEmpty()
  @IsEnum(PointType, {
    message: 'Invalid point type.',
  })
  type: PointType;

  @ApiProperty({ example: 37.7749, description: 'Latitude of the point' })
  @IsNotEmpty()
  @IsDecimal({}, { message: 'Longitude must be a valid decimal number.' })
  latitude: number;

  @ApiProperty({ example: -122.4194, description: 'Longitude of the point' })
  @IsNotEmpty()
  @IsDecimal({}, { message: 'Longitude must be a valid decimal number.' })
  longitude: number;
}
