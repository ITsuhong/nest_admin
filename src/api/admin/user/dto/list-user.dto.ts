import { PartialType } from '@nestjs/mapped-types';
import { PaginationDTO } from '../../../../common/dto/pagination.dto';

export class ListUserDto extends PartialType(PaginationDTO) {
  account?: string;
  name?: string;
}
