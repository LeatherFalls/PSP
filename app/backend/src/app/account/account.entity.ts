import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from '../transaction/transaction.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  balance: number;

  @OneToOne(() => UserEntity, (user) => user.accountId)
  userId: UserEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction)
  transactions: TransactionEntity[];

  constructor(account?: Partial<AccountEntity>) {
    this.id = account?.id;
    this.balance = account?.balance;
    this.userId = account?.userId;
    this.transactions = account?.transactions;
  }
}
