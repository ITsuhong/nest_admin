import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RoutesModuleService } from './routes-module.service';
import { CreateRoutesModuleDto } from './dto/create-routes-module.dto';
import { PaginationDTO } from '../../../common/dto/pagination.dto';
import { UpdateRoutesModuleDto } from './dto/update-routes-module.dto';
import { LoginGuard } from '../../../common/guards/login.guard';

@UseGuards(LoginGuard)
@Controller('admin/routes-module')
export class RoutesModuleController {
  constructor(private readonly routesModuleService: RoutesModuleService) {}

  @Post('/create')
  create(@Body() createRoutesModuleDto: CreateRoutesModuleDto) {
    return this.routesModuleService.create(createRoutesModuleDto);
  }

  @Get('/findAll')
  findAll(@Query() query: PaginationDTO, @Request() req) {
    console.log(req.user, 'user');
    return this.routesModuleService.findAll(query);
  }

  @Post('/update')
  update(@Body() updateRoutesModuleDto: UpdateRoutesModuleDto) {
    return this.routesModuleService.update(updateRoutesModuleDto);
  }

  @Post('/delete')
  delete(@Body() data: { id: number }) {
    return this.routesModuleService.remove(Number(data.id));
  }
}
