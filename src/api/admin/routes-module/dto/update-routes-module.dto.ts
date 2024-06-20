import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutesModuleDto } from './create-routes-module.dto';

export class UpdateRoutesModuleDto extends PartialType(CreateRoutesModuleDto) {
  id: number;
}
