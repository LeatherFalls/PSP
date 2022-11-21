import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;

  const newAccount = {
    id: '305220fb-d3cd-4103-b690-6751ed0b5ccc',
    balance: 100,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            findOneAccount: jest.fn().mockResolvedValue(newAccount),
          },
        },
      ],
    }).compile();

    accountController = module.get<AccountController>(AccountController);
    accountService = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(accountController).toBeDefined();
    expect(accountService).toBeDefined();
  });

  describe('getAccount', () => {
    it('should return an account', async () => {
      const result = await accountController.getAccount(
        '305220fb-d3cd-4103-b690-6751ed0b5ccc',
      );
      expect(result).toEqual(newAccount);
    });
    it('should return not found error', async () => {
      jest.spyOn(accountService, 'findOneAccount').mockImplementation(() => {
        throw new NotFoundException();
      });

      expect(
        accountController.getAccount('305220fb-d3cd-4103-b690-6751ed0b5ccc'),
      ).rejects.toThrow();
    });
    it('should return an error', async () => {
      jest.spyOn(accountService, 'findOneAccount').mockImplementation(() => {
        throw new Error();
      });

      expect(
        accountController.getAccount('305220fb-d3cd-4103-b690-6751ed0b5ccc'),
      ).rejects.toThrow();
    });
  });
});
