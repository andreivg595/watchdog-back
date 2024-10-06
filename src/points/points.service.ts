import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { User } from 'src/users/entities/user.entity';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { Repository } from 'typeorm';
import { PointStatus } from './enums/point-status.enum';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private readonly pointsRepository: Repository<Point>,
  ) {}

  async findAll(): Promise<Point[]> {
    try {
      return await this.pointsRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching points');
    }
  }

  async findOneById(id: number): Promise<Point> {
    const point = await this.pointsRepository.findOne({ where: { id } });
    if (!point) {
      throw new NotFoundException(`Point with ID ${id} not found.`);
    }
    return point;
  }

  async create(createPointDto: CreatePointDto, user: User): Promise<Point> {
    try {
      const point = this.pointsRepository.create({
        ...createPointDto,
        createdBy: user,
        status:
          user.role === Role.ADMIN ? PointStatus.APPROVED : PointStatus.PENDING,
        approvedBy: user.role === Role.ADMIN ? user : null,
      });
      return await this.pointsRepository.save(point);
    } catch (error) {
      throw new InternalServerErrorException('Error creating new point.');
    }
  }

  async approve(id: number, admin: User): Promise<Point> {
    const point = await this.pointsRepository.findOne({
      where: { id, status: PointStatus.PENDING },
    });
    if (!point) {
      throw new NotFoundException(
        `Point with ID ${id} not found or already approved.`,
      );
    }
    try {
      point.status = PointStatus.APPROVED;
      point.approvedBy = admin;
      return await this.pointsRepository.save(point);
    } catch (error) {
      throw new InternalServerErrorException('Error approving point.');
    }
  }

  async update(
    id: number,
    updatePointDto: UpdatePointDto,
    admin: User,
  ): Promise<Point> {
    const point = await this.findOneById(id);

    if (point.status !== PointStatus.APPROVED) {
      throw new ForbiddenException('Cannot modify a non-approved point.');
    }

    try {
      Object.assign(point, updatePointDto);
      point.updatedBy = admin;
      return await this.pointsRepository.save(point);
    } catch (error) {
      throw new InternalServerErrorException('Error updating point.');
    }
  }

  async remove(id: number): Promise<void> {
    const point = await this.findOneById(id);
    if (!point) {
      throw new NotFoundException(`Point with ID ${id} not found.`);
    }
    await this.pointsRepository.softDelete(id);
  }
}
