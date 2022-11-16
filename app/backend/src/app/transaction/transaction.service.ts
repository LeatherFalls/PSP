import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    if (cashOut.accountId.balance < data.value) {
      throw new NotAcceptableException('Insufficient funds');
    }

    cashIn.accountId.balance += data.value;
    cashOut.accountId.balance -= data.value;

    const newTransaction = this.transactionRepository.create({
      debitedAccountId: cashOut.accountId,
      creditedAccountId: cashIn.accountId,
      value: data.value,
      createdAt: new Date(),
    });

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
}
