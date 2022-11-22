import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { AccountModule } from './app/account/account.module';
import { TransactionModule } from './app/transaction/transaction.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST || 'db',
      port: Number(process.env.PGPORT) || 5432,
      database: process.env.PGDATABASE || 'ng_challenge',
      username: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AccountModule,
    TransactionModule,
    AuthModule,
  ],
})
export class AppModule {}
