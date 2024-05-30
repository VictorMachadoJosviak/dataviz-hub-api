import { calculatePagination } from './pagination.dto';

describe('calculatePagination', () => {
  it('should calculate the correct number of pages', () => {
    const page = 1;
    const pageSize = 10;

    expect(calculatePagination(page, pageSize)).toStrictEqual({
      limit: 10,
      offset: 0,
    });
  });
});
