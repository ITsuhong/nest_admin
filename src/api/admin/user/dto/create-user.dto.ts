import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  account: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  roleId: number;
}
