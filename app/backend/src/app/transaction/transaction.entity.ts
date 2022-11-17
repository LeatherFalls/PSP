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
}
