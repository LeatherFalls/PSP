import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTransferDTO } from '../user/dto/createTransfer.fto';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':id')
  async createTransaction(
    @Body() data: CreateTransferDTO,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.transactionService.createTransaction(data, id);
  }

  @Get(':id')
  async getTransactions(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.transactionService.getTransactions(id);
  }

  @Get('/cashIn/:id')
  async getCashInTransactions(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.transactionService.getCashInTransactions(id);
  }

  @Get('/cashOut/:id')
  async getCashOutTransactions(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.transactionService.getCashOutTransactions(id);
  }

  @Get('cashIn/filterByDate/:id/q')
  async getTransactionsByDate(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('minDate') minDate: string,
    @Query('maxDate') maxDate: string,
  ) {
    return await this.transactionService.filterCashInByDate(
      id,
      minDate,
      maxDate,
    );
  }

  @Get('cashOut/filterByDate/:id/q')
  async getCashOutTransactionsByDate(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('minDate') minDate: string,
    @Query('maxDate') maxDate: string,
  ) {
    return await this.transactionService.filterCashOutByDate(
      id,
      minDate,
      maxDate,
    );
  }
}
