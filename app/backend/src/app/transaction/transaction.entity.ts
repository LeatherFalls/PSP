import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from '../account/account.entity';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AccountEntity, (account) => account.id)
  debitedAccountId: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.id)
  creditedAccountId: AccountEntity;

  @Column({ nullable: false })
  value: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;
}