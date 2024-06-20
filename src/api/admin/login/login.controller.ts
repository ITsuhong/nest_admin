import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('admin/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() data: LoginDto) {
    return this.loginService.login(data);
  }
}
