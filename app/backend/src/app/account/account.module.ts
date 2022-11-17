import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { UserEntity } from '../user/user.entity';
import { AccountController } from './account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, UserEntity])],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
