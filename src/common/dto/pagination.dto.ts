import { Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDTO {
  /**
   * 第几页
   * @example 1
   */
  @Transform(({ value }) => parseInt(value))
  // @Min(0)
  readonly pageNumber?: number;

  /**
   * 每页数据条数
   * @example 10
   */
  @Transform(({ value }) => parseInt(value))
  // @Min(0, { message: '要大于0' })
  readonly pageSize?: number;
}
