import { IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from '../account/account.entity';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AccountEntity, (account) => account, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'debited_account_id' })
  debitedAccountId: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'credited_account_id' })
  creditedAccountId: AccountEntity;

  @IsNumber()
  @Column({ nullable: false })
  value: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  constructor(transaction?: Partial<TransactionEntity>) {
    this.id = transaction?.id;
    this.debitedAccountId = transaction?.debitedAccountId;
    this.creditedAccountId = transaction?.creditedAccountId;
    this.value = transaction?.value;
    this.createdAt = transaction?.createdAt;
  }
}
