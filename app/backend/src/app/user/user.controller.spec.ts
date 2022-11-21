import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountEntity } from '../account/account.entity';
import { AccountService } from '../account/account.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

const usersEntityList: UserEntity[] = [
  new UserEntity({
    id: '305220fb-d3cd-4103-b690-6751ed0b5ccb',
    username: 'test',
    password: 'test',
  }),
  new UserEntity({
    id: '305220fb-d3cd-4103-b690-6751ed0b5ccc',
    username: 'test2',
    password: 'test2',
  }),
];

const newUserEntity = new UserEntity({
  username: 'test3',
  password: 'test3',
});

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let accountService: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(usersEntityList),
            create: jest.fn().mockResolvedValue(newUserEntity),
            findOne: jest.fn().mockResolvedValue(usersEntityList[0]),
            delete: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue(usersEntityList[0]),
          },
        },
        {
          provide: AccountService,
          useValue: {
            createAccount: jest.fn().mockResolvedValue({ id: 'test' }),
            deleteAccount: jest.fn().mockResolvedValue(
              new AccountEntity({
                id: '305220fb-d3cd-4103-b690-6751ed0b5ccc',
                balance: 0,
              }),
            ),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    accountService = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
    expect(accountService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await userController.findAll();
      expect(result).toBe(usersEntityList);
      expect(typeof result).toBe('object');
    });
    it('should return an error', async () => {
      jest.spyOn(userService, 'findAll').mockImplementation(() => {
        throw new Error();
      });
      expect(userController.findAll()).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should return a user', async () => {
      const data = new UserEntity({
        username: 'test3',
        password: 'test3',
      });
      const result = await userController.create(data);

      expect(result).toBe(newUserEntity);
    });
    it('should return an error', async () => {
      jest.spyOn(userService, 'create').mockImplementation(() => {
        throw new Error();
      });
      expect(userController.create(newUserEntity)).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const resultByUsername = await userController.findOne('test');
      const resultById = await userController.findOne(
        '305220fb-d3cd-4103-b690-6751ed0b5ccb',
      );
      expect(resultByUsername).toBe(usersEntityList[0]);
      expect(resultById).toBe(usersEntityList[0]);
    });
    it('should return a not found error', async () => {
      jest.spyOn(userService, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });
      expect(userController.findOne('test')).rejects.toThrow();
    });
    it('should return an error', async () => {
      jest.spyOn(userService, 'findOne').mockImplementation(() => {
        throw new Error();
      });
      expect(userController.findOne('test')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const data = new UserEntity({
        username: 'test3',
        password: 'test3',
      });
      const result = await userController.update(
        '305220fb-d3cd-4103-b690-6751ed0b5ccb',
        data,
      );
      expect(result).toBe(usersEntityList[0]);
    });
    it('should return a not found error', async () => {
      jest.spyOn(userService, 'update').mockImplementation(() => {
        throw new NotFoundException();
      });
      expect(
        userController.update(
          '305220fb-d3cd-4103-b690-6751ed0b5ccb',
          newUserEntity,
        ),
      ).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a user and an account', async () => {
      const user = new UserEntity({
        id: '305220fb-d3cd-4103-b690-6751ed0b5ccb',
        username: 'test',
        password: 'test',
        accountId: {
          id: '305220fb-d3cd-4103-b690-6751ed0b59e2',
          balance: 0,
        } as any,
      });
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const result = await userController.delete(user.id);
      const account = await accountService.deleteAccount(user.accountId.id);

      expect(result).toBe(undefined);
      expect(account).toBe(undefined);
    });
    it('should return a not found error', async () => {
      jest.spyOn(userService, 'delete').mockImplementation(() => {
        throw new NotFoundException();
      });
      expect(userController.delete('test')).rejects.toThrow();
    });
    it('should return an error', async () => {
      jest.spyOn(userService, 'delete').mockImplementation(() => {
        throw new Error();
      });
      expect(userController.delete('test')).rejects.toThrow();
    });
  });
});
