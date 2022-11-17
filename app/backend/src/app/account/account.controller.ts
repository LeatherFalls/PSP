import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';

@UseGuards(AuthGuard('jwt'))
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  async getAccount(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.accountService.findOneAccount({ where: { id } });
  }
}
