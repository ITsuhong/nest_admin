import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { Result } from '@/common/dto/result.dto';
import { plainToInstance } from 'class-transformer';
import { Role } from '../roles/entities/role.entity';
import { RoutesModule } from '../routes-module/entities/routes-module.entity';
import { getPagination } from '@/common/utils/index.util';
import { ListUserDto } from './dto/list-user.dto';
import { JwtService } from '@nestjs/jwt';
import { getRoutesModule } from '@/common/utils/index.util';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async create(createUserDto: CreateUserDto) {
    try {
      const result = await this.entityManager.findOne(User, {
        where: { account: createUserDto.account },
      });
      if (result) {
        return new Result().error({ message: '用户已存在' });
      }
      const role = await this.entityManager.findOne(Role, {
        where: { id: Number(createUserDto.roleId) },
      });
      const newUser = new User();
      newUser.name = createUserDto.name;
      newUser.account = createUserDto.account;
      newUser.role = role;
      const entity = plainToInstance(User, newUser);
      const user = await this.entityManager.save(User, entity);
      if (user) {
        return new Result().ok();
      } else {
        return new Result().error({ message: '创建失败' });
      }
    } catch (e) {
      return new Result().error({ message: '创建失败' });
    }
  }

  async findAll(data: ListUserDto) {
    const { pageNumber = 1, pageSize = 10 } = data;
    try {
      const res = await this.entityManager
        .createQueryBuilder(User, 'user')
        .where('user.name LIKE :name', {
          name: `%${data.name || ''}%`,
        })
        .andWhere('user.account LIKE :account', {
          account: `%${data.account || ''}%`,
        })
        .leftJoinAndSelect('user.role', 'roles')
        .getManyAndCount();
      const [list, total] = res;
      const pageData = getPagination({
        list: list,
        pageNumber,
        pageSize,
        total,
      });
      return new Result().ok({ data: { ...pageData } });
    } catch (e) {
      return new Result().error({ message: e.message });
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      const role = await this.entityManager.findOne(Role, {
        where: { id: Number(updateUserDto.roleId) },
      });
      delete updateUserDto.roleId;
      const user = Object.assign(new User(), updateUserDto, { role });
      const result = await this.entityManager.update(
        User,
        updateUserDto.id,
        user,
      );
      if (result.affected) {
        return new Result().ok();
      } else {
        return new Result().error({ message: '更新失败' });
      }
    } catch (e) {
      return new Result().error({ message: e.message });
    }
  }

  async remove(id: number) {
    try {
      const result = await this.entityManager.delete(User, id);
      if (result.affected) {
        return new Result().ok();
      } else {
        return new Result().error({ message: '删除失败' });
      }
    } catch (e) {
      return new Result().error({ message: e.message });
    }
  }

  async routesTree(user: User) {
    const admin = await this.entityManager
      .createQueryBuilder(User, 'user')
      .where('user.id = :id', { id: user.id })
      .addSelect('user.role')
      .getOne();
    if (admin.administrator === 1) {
      const allRoutes = await this.entityManager.find(RoutesModule);
      const result = getRoutesModule(allRoutes);
      return new Result().ok({ data: result });
    }
    const res = await this.entityManager
      .createQueryBuilder(User, 'user')
      .where('user.id = :id', { id: user.id })
      .leftJoinAndSelect('user.role', 'roles')
      .leftJoinAndSelect('roles.routes', 'routes_module')
      .getOne();
    if (!res.role?.routes) {
      return new Result().ok({ data: [] });
    }
    const allRoute = res.role.routes;
    const result = getRoutesModule(allRoute);
    return new Result().ok({ data: result });
  }
}
