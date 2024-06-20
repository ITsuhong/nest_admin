import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

import { UpdateRoleDto } from './dto/update-role.dto';
import { ListRoleDto } from './dto/list-role.dto';
import { LoginGuard } from '../../../common/guards/login.guard';

@UseGuards(LoginGuard)
@Controller('admin/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('/create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('/findAll')
  findAll(@Query() query: ListRoleDto) {
    return this.rolesService.findAll(query);
  }

  @Post('/update')
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(updateRoleDto);
  }

  @Post('/delete')
  delete(@Body() data: { id: number }) {
    console.log(data.id, 'jjj');
    return this.rolesService.remove(Number(data.id));
  }
}
