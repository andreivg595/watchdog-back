import { IsString, IsDecimal, IsEnum, IsNotEmpty } from 'class-validator';
import { PointType } from '../enums/point-type.enum';

export class CreatePointDto {
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @IsNotEmpty()
  @IsString({ message: 'Address must be a string.' })
  address: string;

  @IsNotEmpty()
  @IsEnum(PointType, {
    message: 'Invalid point type.',
  })
  type: PointType;

  @IsNotEmpty()
  @IsDecimal({}, { message: 'Longitude must be a valid decimal number.' })
  latitude: number;

  @IsNotEmpty()
  @IsDecimal({}, { message: 'Longitude must be a valid decimal number.' })
  longitude: number;
}
