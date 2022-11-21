import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { CreateTransferDTO } from '../user/dto/createTransfer.fto';
import { UserService } from '../user/user.service';
import { TransactionEntity } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly userService: UserService,
    private readonly accountService: AccountService,
  ) {}

  async createTransaction(
    data: CreateTransferDTO,
    id: string,
  ): Promise<TransactionEntity> {
    const cashIn = await this.userService.findOne({
      where: { username: data.username },
    });
    const cashOut = await this.userService.findOne({
      where: { id },
    });

    if (
      cashOut.accountId.balance < data.value ||
      cashOut.accountId.balance <= 0
    ) {
      throw new NotAcceptableException('Insufficient funds');
    }

    cashIn.accountId.balance += Number(data.value);
    cashOut.accountId.balance -= Number(data.value);

    const newTransaction = this.transactionRepository.create({
      debitedAccountId: cashOut.accountId,
      creditedAccountId: cashIn.accountId,
      value: Number(data.value),
      createdAt: new Date().toISOString(),
    });

    console.log(newTransaction);

    await this.accountService.updateAccount(
      cashIn.accountId.id,
      cashIn.accountId.balance,
    );

    await this.accountService.updateAccount(
      cashOut.accountId.id,
      cashOut.accountId.balance,
    );

    return await this.transactionRepository.save(newTransaction);
  }

  async getTransactions(id: string): Promise<TransactionEntity[]> {
    const user = await this.userService.findOne({
      where: { id },
    });

    return await this.transactionRepository.find({
      where: [
        { debitedAccountId: user.accountId as any },
        { creditedAccountId: user.accountId as any },
      ],
    });
  }

  async getCashInTransactions(id: string): Promise<TransactionEntity[]> {
    const user = await this.userService.findOne({
      where: { id },
    });

    return await this.transactionRepository.find({
      where: { creditedAccountId: user.accountId as any },
    });
  }

  async getCashOutTransactions(id: string): Promise<TransactionEntity[]> {
    const user = await this.userService.findOne({
      where: { id },
    });

    return await this.transactionRepository.find({
      where: { debitedAccountId: user.accountId as any },
    });
  }

  async filterCashInByDate(
    id: string,
    minDate: string,
    maxDate: string,
  ): Promise<TransactionEntity[]> {
    console.log(minDate, maxDate);

    const user = await this.userService.findOne({
      where: { id },
    });
    const test = await this.transactionRepository.find({
      where: [
        {
          createdAt: Between(minDate, maxDate) as any,
          creditedAccountId: user.accountId as any,
        },
      ],
    });

    return test;
  }

  async filterCashOutByDate(
    id: string,
    minDate: string,
    maxDate: string,
  ): Promise<TransactionEntity[]> {
    const user = await this.userService.findOne({
      where: { id },
    });

    return await this.transactionRepository.find({
      where: [
        {
          createdAt: Between(minDate, maxDate) as any,
          debitedAccountId: user.accountId as any,
        },
      ],
    });
  }
}
