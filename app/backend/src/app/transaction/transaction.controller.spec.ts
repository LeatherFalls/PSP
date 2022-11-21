import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../account/account.service';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TransactionController } from './transaction.controller';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';

const newUser = new UserEntity({
  id: '305220fb-d3cd-4103-b690-6751ed0b5ccc',
  username: 'test',
  password: 'test',
});

const newTransactionsEntity: TransactionEntity[] = [
  new TransactionEntity({
    id: '305220fb-d3cd-4103-b690-6751ed0b5ccc',
    value: 100,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
  }),
  new TransactionEntity({
    id: '305220fb-d3cd-4103-b690-6751ed0b5ccc',
    value: 200,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  }),
];

describe('TransactionController', () => {
  let transactionController: TransactionController;
  let transactionService: TransactionService;
  let userService: UserService;
  let accountService: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            filterCashInByDate: jest
              .fn()
              .mockResolvedValue(newTransactionsEntity),
            filterCashOutByDate: jest
              .fn()
              .mockResolvedValue(newTransactionsEntity),
            createTransaction: jest
              .fn()
              .mockResolvedValue(newTransactionsEntity[0]),
          },
        },
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: AccountService,
          useValue: {},
        },
      ],
    }).compile();

    transactionController = module.get<TransactionController>(
      TransactionController,
    );
    transactionService = module.get<TransactionService>(TransactionService);
    userService = module.get<UserService>(UserService);
    accountService = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(transactionController).toBeDefined();
    expect(transactionService).toBeDefined();
    expect(userService).toBeDefined();
    expect(accountService).toBeDefined();
  });

  describe('filterCashInByDate', () => {
    it('should return a list of cash in transactions', async () => {
      const result = await transactionController.getTransactionsByDate(
        newUser.id,
        '2022-11-15',
        '2022-11-21',
      );
      expect(result).toEqual(newTransactionsEntity);
    });
    it('should return an error', async () => {
      jest
        .spyOn(transactionService, 'filterCashInByDate')
        .mockRejectedValue(new Error());
      await expect(
        transactionController.getTransactionsByDate(
          newUser.id,
          '2022-11-15',
          '2022-11-21',
        ),
      ).rejects.toThrow();
    });
  });

  describe('filterCashOutByDate', () => {
    it('should return a list of cash out transactions', async () => {
      const result = await transactionController.getCashOutTransactionsByDate(
        newUser.id,
        '2022-11-15',
        '2022-11-21',
      );
      expect(result).toEqual(newTransactionsEntity);
    });
    it('should return an error', async () => {
      jest
        .spyOn(transactionService, 'filterCashOutByDate')
        .mockRejectedValue(new Error());
      await expect(
        transactionController.getCashOutTransactionsByDate(
          newUser.id,
          '2022-11-15',
          '2022-11-21',
        ),
      ).rejects.toThrow();
    });
  });

  describe('createTransaction', () => {
    it('should create a transaction', async () => {
      const result = await transactionController.createTransaction(
        {
          username: 'test',
          value: 100,
        },
        '305220fb-d3cd-4103-b690-6751ed0b5ccc',
      );
      expect(result).toEqual(newTransactionsEntity[0]);
    });
  });
});
