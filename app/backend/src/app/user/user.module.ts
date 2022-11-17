import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AccountService } from '../account/account.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AccountEntity } from '../account/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity])],
  providers: [UserService, AccountService],
  controllers: [UserController],
})
export class UserModule {}
