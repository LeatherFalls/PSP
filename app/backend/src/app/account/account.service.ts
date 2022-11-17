import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountService {
  private balance: number;

  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {
    this.balance = 100;
  }

  async createAccount(): Promise<AccountEntity> {
    const newAccount = this.accountRepository.create();
    newAccount.balance = this.balance;
    return await this.accountRepository.save(newAccount);
  }

  async findOneAccount(
    options: FindOneOptions<AccountEntity>,
  ): Promise<AccountEntity> {
    try {
      return await this.accountRepository.findOneOrFail({
        ...options,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateAccount(id: string, balance: number): Promise<AccountEntity> {
    const account = await this.findOneAccount({ where: { id } });
    this.accountRepository.merge(account, { balance });
    return await this.accountRepository.save(account);
  }

  async deleteAccount(id: string): Promise<AccountEntity> {
    const account = await this.accountRepository.findOneOrFail({
      where: { id },
    });
    return await this.accountRepository.remove(account);
  }
}
