import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { AccountEntity } from '../account/account.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => AccountEntity, (account) => account.id)
  @JoinColumn({ name: 'account_id' })
  accountId: AccountEntity;

  @BeforeInsert()
  passwordHash() {
    this.password = hashSync(this.password, 8);
  }
}
