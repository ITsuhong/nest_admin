import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoutesModule } from '../routes-module/entities/routes-module.entity';
import { Role } from './entities/role.entity';
import { Result } from '../../../common/dto/result.dto';
import { getPagination } from '../../../common/utils/index.util';
import { ListRoleDto } from './dto/list-role.dto';

@Injectable()
export class RolesService {
  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @InjectRepository(RoutesModule)
  private routesModuleRepository: Repository<RoutesModule>;

  async create(createRoleDto: CreateRoleDto) {
    // Assuming createRoleDto.modulesIds is a string
    try {
      const moduleIdsArray: string[] = createRoleDto.modulesIds.split(',');

      const modules = moduleIdsArray.map((moduleId) => ({
        id: Number(moduleId),
      }));
      const RoutesModules = await this.routesModuleRepository.find({
        where: modules,
      });
      const role = new Role();
      role.name = createRoleDto.name;
      role.routes = RoutesModules;
      role.description = createRoleDto.description;
      await this.roleRepository.save(role);
      return new Result().ok();
    } catch (error) {
      return new Result().error(error.message);
    }
  }

  async findAll(data: ListRoleDto) {
    const { pageNumber = 1, pageSize = 10 } = data;
    const res = await this.roleRepository
      .createQueryBuilder('roles')
      .where('roles.name LIKE :name', { name: `%${data.name || ''}%` })
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .leftJoinAndSelect('roles.routes', 'routes_module')
      .orderBy('roles.updateTime', 'DESC')
      .getManyAndCount();
    const [list, total] = res;
    const result = getPagination({ list, total, pageNumber, pageSize });
    return new Result().ok({ data: result });
  }

  async update(updateRoleDto: UpdateRoleDto) {
    try {
      const moduleIdsArray: string[] = updateRoleDto.modulesIds.split(',');
      // const RoutesModules = await this.routesModuleRepository.findBy(modules);
      // 获取要更新的路由模块
      const RoutesModules = await this.routesModuleRepository
        .createQueryBuilder('routesModule')
        .where('routesModule.id IN (:...moduleIds)', {
          moduleIds: moduleIdsArray,
        })
        .getMany();
      const role = await this.roleRepository.findOne({
        relations: ['routes'],
        where: { id: updateRoleDto.id },
      });
      if (!role) {
        return new Result().error({ message: '角色不存在' });
      }
      role.name = updateRoleDto.name;
      role.description = updateRoleDto.description;
      role.routes = RoutesModules;
      const res = await this.roleRepository.save(role);
      if (res) {
        return new Result().ok();
      } else {
        return new Result().error({ message: '更新失败' });
      }
    } catch (error) {
      console.log(error, '错误');
      return new Result().error(error.message);
    }
  }

  async remove(id: number) {
    try {
      const role = await this.roleRepository.findOneBy({ id });
      console.log(role, '删除结果');
      const res = await this.roleRepository.remove(role);
      if (res) {
        return new Result().ok();
      } else {
        return new Result().error({ message: '删除失败' });
      }
    } catch (e) {
      return new Result().error(e.message);
    }
  }
}
