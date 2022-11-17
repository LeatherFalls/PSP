import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async validateUser(username: string, pass: string): Promise<UserEntity> {
    let user: UserEntity;

    try {
      user = await this.userService.findOneForLogin({ where: { username } });
    } catch (error) {
      return null;
    }

    const isMatch = compareSync(pass, user.password);

    if (!isMatch) return null;

    return user;
  }
}
