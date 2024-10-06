import { IsString, IsDecimal, IsEnum, IsNotEmpty } from 'class-validator';
import { PointType } from '../enums/point-type.enum';

export class CreatePointDto {
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @IsNotEmpty()
  @IsEnum(
    [
      PointType.PIPICAN,
      PointType.DOG_BEACH,
      PointType.VETERINARIAN,
      PointType.WATER_FOUNTAIN,
    ],
    {
      message: 'Invalid point type.',
    },
  )
  type: string;

  @IsNotEmpty()
  @IsDecimal({}, { message: 'Longitude must be a valid decimal number.' })
  latitude: number;

  @IsNotEmpty()
  @IsDecimal({}, { message: 'Longitude must be a valid decimal number.' })
  longitude: number;
}
