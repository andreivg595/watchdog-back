import { Role } from 'src/auth/enums/role.enum';
import { Point } from 'src/points/entities/point.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Point, (point) => point.createdBy)
  createdPoints: Point[];

  @OneToMany(() => Point, (point) => point.approvedBy)
  approvedPoints: Point[];
}
