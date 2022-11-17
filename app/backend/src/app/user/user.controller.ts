import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { UpdateDTO } from './dto/update.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  async create(@Body() user: UserEntity) {
    const newAccount = await this.accountService.createAccount();
    const newUser = await this.userService.create({
      ...user,
      accountId: newAccount.id as any,
    });
    return newUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findOne({ where: { id } });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  async findOneByUsername(@Param('username') username: string) {
    return await this.userService.findOne({ where: { username } });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateDTO,
  ) {
    return await this.userService.update(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.delete(id);
    await this.accountService.deleteAccount(user.accountId.id as string);
  }
}
