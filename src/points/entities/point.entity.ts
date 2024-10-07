import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PointType } from '../enums/point-type.enum';
import { PointStatus } from '../enums/point-status.enum';

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: PointType })
  type: string;

  @Column('decimal', { precision: 10, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude: number;

  @Column({ type: 'enum', enum: PointStatus, default: PointStatus.PENDING })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.points)
  createdBy: User;

  @ManyToOne(() => User, { nullable: true })
  updatedBy: User;

  @ManyToOne(() => User, { nullable: true })
  approvedBy: User;
}
