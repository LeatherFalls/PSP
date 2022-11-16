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

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number',
  })
  @Column({ nullable: false })
  password: string;

  @OneToOne(() => AccountEntity, (account) => account.userId, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  accountId: AccountEntity;

  @BeforeInsert()
  passwordHash?() {
    this.password = hashSync(this.password, 10);
  }
}
