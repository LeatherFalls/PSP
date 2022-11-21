import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

const usersEntityList: UserEntity[] = [
  new UserEntity({
    username: 'testando',
    password: '12345678Test',
  }),
  new UserEntity({
    username: 'testando2',
    password: '12345678Test',
  }),
];

const updatedUser = new UserEntity({
  username: 'test10',
  password: '12345678Test',
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn().mockReturnValue(usersEntityList[0]),
            save: jest.fn().mockResolvedValue(usersEntityList[0]),
            find: jest.fn().mockResolvedValue(usersEntityList),
            findOneOrFail: jest.fn().mockResolvedValue(usersEntityList[0]),
            merge: jest.fn().mockReturnValue(updatedUser),
            remove: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const data = new UserEntity({
        username: 'test10',
        password: '12345678Test',
      });

      const user = await userService.create(data);

      expect(user).toEqual(usersEntityList[0]);
      expect(userRepository.create).toBeCalledWith(usersEntityList[0]);
      expect(userRepository.save).toBeCalledWith(usersEntityList[0]);
    });
    it('should throw an error if user already exists', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(usersEntityList[0]);
      await expect(userService.create(usersEntityList[0])).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await userService.findAll();

      expect(users).toEqual(usersEntityList);
    });
    it('should throw an error', async () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      await expect(userService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOneOrFail', () => {
    it('should return a user', async () => {
      const user = await userService.findOne({
        where: { id: '305220fb-d3cd-4103-b690-6751ed0b5ccb' },
      });

      expect(user).toEqual(usersEntityList[0]);
    });
    it('should throw an error', async () => {
      jest
        .spyOn(userRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      await expect(
        userService.findOne({
          where: { id: '305220fb-d3cd-4103-b690-6751ed0b5ccb' },
        }),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const data = {
        username: 'test10',
        password: '12345678Test',
      };

      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(updatedUser);

      const user = await userService.update(
        '305220fb-d3cd-4103-b690-6751ed0b5ccb',
        data,
      );

      expect(user).toEqual(updatedUser);
    });
    it('should throw an error', async () => {
      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());

      await expect(
        userService.update('305220fb-d3cd-4103-b690-6751ed0b5ccb', {
          username: 'test10',
          password: '12345678Test',
        }),
      ).rejects.toThrowError();
    });
    it('should throw an error if user does not exist', async () => {
      jest
        .spyOn(userRepository, 'save')
        .mockRejectedValueOnce(new Error('User does not exist'));

      await expect(
        userService.update('305220fb-d3cd-4103-b690-6751ed0b5ccb', {
          username: 'test10',
          password: '12345678Test',
        }),
      ).rejects.toThrowError('User does not exist');
    });
  });

  describe('delete', () => {
    it('should remove a user', async () => {
      const user = await userService.delete(
        '305220fb-d3cd-4103-b690-6751ed0b5ccb',
      );

      expect(user).toBeUndefined();
      expect(userRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(userRepository.remove).toHaveBeenCalledTimes(1);
    });
    it('should throw a not found exception', async () => {
      jest
        .spyOn(userRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      await expect(
        userService.delete('305220fb-d3cd-4103-b690-6751ed0b5ccb'),
      ).rejects.toThrowError(NotFoundException);
    });
    it('should throw an error', async () => {
      jest.spyOn(userRepository, 'remove').mockRejectedValueOnce(new Error());

      await expect(
        userService.delete('305220fb-d3cd-4103-b690-6751ed0b5ccb'),
      ).rejects.toThrowError();
    });
  });
});
