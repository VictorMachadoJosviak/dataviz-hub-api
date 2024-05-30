import { PageableQueryResponse } from '../../../common/pagination/pagination.dto';
import { DashboardDto } from '../dto/response/dashboard/dashboard.dto';
import { DashboardFrequencyUpdate } from '../enums/dashboard-frequency-update.enum';
import { DashboardPolarity } from '../enums/dashboard-polarity.enum';
import { DashboardTechnology } from '../enums/dashboard-technology.enum';

export const findAllDashboardsResponseFixture: PageableQueryResponse<DashboardDto> =
  {
    total: 1,
    data: [
      {
        id: '1',
        name: 'Test',
        technology: DashboardTechnology.POWER_BI,
        area: {
          id: '1',
          name: 'Test',
        },
        campaign: 'campaign',
        description: 'description',
        isResponsive: true,
        linkDesktop: 'link',
        linkMobile: 'link',
        metrics: [
          {
            id: '1',
            calculus: 'calculus',
            description: 'description',
            name: 'name',
            polarity: DashboardPolarity.DOWN,
          },
        ],
        origins: [
          {
            id: '1',
            description: 'description',
            name: 'name',
          },
        ],
        responsibles: [
          {
            id: '1',
            email: 'email',
            name: 'name',
          },
        ],
        updateFrequency: DashboardFrequencyUpdate.DAILY,
        usabilityWarning: 'usabilityWarning',
      },
    ],
  };
