import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './transaction.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { AccountEntity } from '../account/account.entity';
import { AccountService } from '../account/account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, UserEntity, AccountEntity]),
  ],
  providers: [TransactionService, UserService, AccountService],
  controllers: [TransactionController],
})
export class TransactionModule {}
