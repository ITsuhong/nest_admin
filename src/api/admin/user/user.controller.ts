import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginGuard } from '../../../common/guards/login.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDTO } from '../../../common/dto/pagination.dto';
import { ListUserDto } from './dto/list-user.dto';

// @UseGuards(LoginGuard)
@Controller('/admin/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create_user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/findAll')
  findAll(@Query() query: ListUserDto) {
    return this.userService.findAll(query);
  }

  @Post('/update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Post('/delete')
  delete(@Body() id: number) {
    return this.userService.remove(id);
  }

  @Get('/routesTree')
  routesTree(@Request() request: any) {
    return this.userService.routesTree(request.user);
  }
}
