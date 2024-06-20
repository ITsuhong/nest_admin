import { BaseDto } from '../../../../common/dto/base.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto extends BaseDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  modulesIds: string;
}
