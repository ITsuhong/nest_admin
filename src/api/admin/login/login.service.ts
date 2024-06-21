import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Result } from '../../../common/dto/result.dto';
import { BcryptUtil } from '../../../common/utils/bcrypt.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  @Inject(JwtService)
  private jwtService: JwtService;

  async login(data: LoginDto) {
    try {
      const result = await this.entityManager
        .createQueryBuilder(User, 'user')
        .where('user.account = :account', { account: data.account })
        .addSelect('user.password')
        .getOne();
      if (result === null) {
        return new Result().error({ message: '没有这个用户' });
      } else if (
        // data.password !== result.password
        !(await BcryptUtil.compare(data.password, result.password))
      ) {
        return new Result().error({ message: '账号或密码不对' });
      } else {
        delete result.password;
        const token = this.jwtService.sign({ user: result });
        return new Result().ok({ data: { ...result, token } });
      }
    } catch (e) {
      return new Result().error({ message: e.message });
    }
  }
}
