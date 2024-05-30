import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class PageableQueryResponse<T> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  data: T[];
}

export class PageableQueryRequest {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  @ApiProperty()
  page: number;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  @ApiProperty()
  pageSize: number;
}

export const calculatePagination = (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  return { offset, limit };
};
