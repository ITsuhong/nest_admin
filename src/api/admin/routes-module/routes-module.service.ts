import { Injectable } from '@nestjs/common';
import { CreateRoutesModuleDto } from './dto/create-routes-module.dto';
import { UpdateRoutesModuleDto } from './dto/update-routes-module.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { RoutesModule } from './entities/routes-module.entity';
import { Result } from '../../../common/dto/result.dto';
import { IRoutesModule } from './interface';
import { PaginationDTO } from '../../../common/dto/pagination.dto';
import { getPagination } from '../../../common/utils/index.util';

@Injectable()
export class RoutesModuleService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  async create(createRoutesModuleDto: CreateRoutesModuleDto) {
    try {
      const res = await this.entityManager.save(
        RoutesModule,
        createRoutesModuleDto,
      );
      if (res) {
        return new Result().ok();
      } else {
        return new Result().error({ message: '创建失败' });
      }
    } catch (e) {
      return new Result().error({ message: e.message });
    }
  }

  async findAll(data: PaginationDTO) {
    const { pageNumber = 1, pageSize = 10 } = data;
    const fatherRoutesModule = await this.entityManager
      .createQueryBuilder(RoutesModule, 'routes_module')
      .where('routes_module.pid = :pid', { pid: 0 })
      .orderBy('routes_module.sort', 'ASC')
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    const [list, total] = fatherRoutesModule;
    const result: IRoutesModule[] = [];
    for (const item of list) {
      const resultRoutes: IRoutesModule = { children: [], ...item };
      resultRoutes.children = await this.entityManager.find(RoutesModule, {
        where: { pid: item.id },
      });
      result.push(resultRoutes);
    }
    const pageData = getPagination({
      list: result,
      pageNumber,
      pageSize,
      total,
    });
    return new Result().ok({ data: pageData });
  }

  async update(updateRoutesModuleDto: UpdateRoutesModuleDto) {
    try {
      const res = await this.entityManager.update(
        RoutesModule,
        updateRoutesModuleDto.id,
        updateRoutesModuleDto,
      );
      console.log(res, 'haha');
      if (res.affected) {
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
      const routsModule = await this.entityManager.findOneBy(RoutesModule, {
        id: id,
      });
      const res = await this.entityManager.remove(RoutesModule, routsModule);
      if (res) {
        return new Result().ok();
      } else {
        return new Result().error({ message: '删除失败' });
      }
    } catch (e) {
      return new Result().error({ message: e.message });
    }
  }
}
