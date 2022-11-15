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
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: UserEntity) {
    return await this.userService.create(user);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findOne({ where: { id } });
  }

  @Get(':username')
  async findOneByUsername(@Param('username') username: string) {
    return await this.userService.findOne({ where: { username } });
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, data: UserEntity) {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.delete(id);
  }
}
