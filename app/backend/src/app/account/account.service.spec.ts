import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';

const accountEntity: AccountEntity = new AccountEntity({
  balance: 100,
});

describe('AccountService', () => {
  let accountService: AccountService;
  let accountRepository: Repository<AccountEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(AccountEntity),
          useValue: {
            create: jest.fn().mockReturnValue(accountEntity),
            save: jest.fn().mockResolvedValue(accountEntity),
            findOneOrFail: jest.fn().mockResolvedValue(accountEntity),
            merge: jest.fn().mockReturnValue(accountEntity),
            remove: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
    accountRepository = module.get<Repository<AccountEntity>>(
      getRepositoryToken(AccountEntity),
    );
  });

  it('should be defined', () => {
    expect(accountService).toBeDefined();
    expect(accountRepository).toBeDefined();
  });

  describe('createAccount', () => {
    it('should create an account', async () => {
      const result = await accountService.createAccount();
      expect(result).toEqual(accountEntity);
      expect(result.balance).toEqual(100);
    });
    it('should throw an error', async () => {
      accountRepository.create = jest.fn().mockReturnValue(undefined);
      await expect(accountService.createAccount()).rejects.toThrow();
    });
  });

  describe('findOneAccount', () => {
    it('should find an account', async () => {
      const result = await accountService.findOneAccount({
        where: { id: '305220fb-d3cd-4103-b690-6751ed0b5ccb' },
      });
      expect(result).toEqual(accountEntity);
    });
    it('should throw an error', async () => {
      accountRepository.findOneOrFail = jest.fn().mockRejectedValue(undefined);
      await expect(
        accountService.findOneAccount({
          where: {
            id: '305220fb-d3cd-4103-b690-6751ed0b5ccb305220fb-d3cd-4103-b690-6751ed0b5ccb',
          },
        }),
      ).rejects.toThrowError();
    });
  });

  describe('updateAccount', () => {
    it('should update an account', async () => {
      const result = await accountService.updateAccount(
        '305220fb-d3cd-4103-b690-6751ed0b5ccb',
        100,
      );
      expect(result).toEqual(accountEntity);
    });
    it('should throw an error', async () => {
      accountRepository.findOneOrFail = jest.fn().mockRejectedValue(undefined);
      await expect(
        accountService.updateAccount(
          '305220fb-d3cd-4103-b690-6751ed0b5ccb305220fb-d3cd-4103-b690-6751ed0b5ccb',
          100,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('deleteAccount', () => {
    it('should delete an account', async () => {
      const result = await accountService.deleteAccount(
        '305220fb-d3cd-4103-b690-6751ed0b5ccb',
      );

      expect(result).toBeUndefined();
      expect(accountRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(accountRepository.remove).toHaveBeenCalledTimes(1);
    });
    it('should throw an error', async () => {
      jest
        .spyOn(accountRepository, 'remove')
        .mockRejectedValueOnce(new Error());

      await expect(
        accountService.deleteAccount(accountEntity.id),
      ).rejects.toThrowError();
    });
  });
});
