import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { PointsModule } from './points/points.module';
import { Point } from './points/entities/point.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'dog_app_db',
      entities: [User, Point],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PointsModule,
  ],
})
export class AppModule {}
