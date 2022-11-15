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
import { MinLength, Matches, IsString } from 'class-validator';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @MinLength(3)
  @Column({ nullable: false, unique: true })
  username: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
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
