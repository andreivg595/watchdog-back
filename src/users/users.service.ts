import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'confirmPassword'>> {
    try {
      const user = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error saving the user');
    }
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({ where: { username } });
    } catch (error) {
      throw new InternalServerErrorException('Error finding the user');
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException('Error finding the user by email');
    }
  }

  async findOneByUsernameWithPassword(
    username: string,
  ): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({
        where: { username },
        select: ['id', 'username', 'email', 'password', 'role'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error finding the user by email');
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, userRole: string) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (userRole !== Role.ADMIN) {
      delete updateUserDto.role;
    }

    if (updateUserDto.password && updateUserDto.confirmPassword) {
      if (updateUserDto.password !== updateUserDto.confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      delete updateUserDto.confirmPassword; // Eliminamos confirmPassword
    }

    Object.assign(user, updateUserDto);
    await this.usersRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.remove(user);
  }
}
