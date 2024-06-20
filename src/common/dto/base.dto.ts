export class BaseDto {
  /**
   * 创建时间
   * @example Date
   */
  readonly createTime: Date;

  /**
   * 创建人
   * @example string
   */
  creator?: string;

  /**
   * 更新时间
   * @example Date
   */
  readonly updateTime: Date;

  /**
   * 更新人
   * @example string
   */
  updater?: string;

  /**
   * 更新次数
   * @example 1
   */
  version: number;
}
