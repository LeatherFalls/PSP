import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { AccountService } from '../account/account.service';
import { UserService } from '../user/user.service';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';

const transactionsList: TransactionEntity[] = [
  new TransactionEntity({
    value: 100,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
  }),
  new TransactionEntity({
    value: 200,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  }),
];

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let transactionRepository: Repository<TransactionEntity>;
  let accountRepository: Repository<AccountEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        AccountService,
        UserService,
        {
          provide: getRepositoryToken(TransactionEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(transactionsList),
          },
        },
      ],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(transactionService).toBeDefined();
    expect(transactionRepository).toBeDefined();
    expect(accountRepository).toBeDefined();
  });

  describe('filterCashInByDate', () => {
    it('should return an array of transactions', async () => {
      const result = await transactionService.filterCashInByDate(
        '305220fb-d3cd-4103-b690-6751ed0b5ccb',
        '2022-11-15',
        '2022-11-22',
      );
      expect(result).toEqual(transactionsList);
    });
  });
});
