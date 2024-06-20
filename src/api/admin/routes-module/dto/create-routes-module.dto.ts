import { BaseDto } from '../../../../common/dto/base.dto';

export class CreateRoutesModuleDto extends BaseDto {
  pid: number;
  name: string;
  path: string;
  description: string;
  sort: number;
}
