import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (existingUser) {
      throw new NotFoundException('User already exists');
    }
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      select: ['id', 'username', 'accountId'],
    });
  }

  async findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneOrFail({
        select: ['id', 'username', 'accountId'],
        ...options,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UserEntity): Promise<UserEntity> {
    const user = await this.findOne({ where: { id } });
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<UserEntity> {
    const user = await this.findOne({ where: { id } });
    return await this.userRepository.remove(user);
  }
}
