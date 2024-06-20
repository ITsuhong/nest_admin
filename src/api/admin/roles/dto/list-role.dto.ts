import { PartialType } from '@nestjs/mapped-types';
import { PaginationDTO } from '../../../../common/dto/pagination.dto';

export class ListRoleDto extends PartialType(PaginationDTO) {
  name?: string;
}
