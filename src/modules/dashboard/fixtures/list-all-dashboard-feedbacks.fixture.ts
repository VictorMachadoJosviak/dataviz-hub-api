import { PageableQueryResponse } from '../../../common/pagination/pagination.dto';
import { DashboardFeedbackResponseDto } from '../dto/response/dashboard-feedback/dashboard-feedback.dto';

export const listDashboardFeedbacksResponseFixture: PageableQueryResponse<DashboardFeedbackResponseDto> =
  {
    total: 1,
    data: [
      {
        comment: 'comment',
        createdAt: new Date('2021-09-01T00:00:00Z'),
        id: '1',
        user: {
          id: '1',
          email: 'email',
          name: 'name',
        },
      },
    ],
  };
