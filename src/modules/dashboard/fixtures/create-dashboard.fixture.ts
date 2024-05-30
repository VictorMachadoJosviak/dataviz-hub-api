import { Collection } from '@mikro-orm/core';
import { CreateDashboardDto } from '../dto/request/create-dashboard/create-dashboard.dto';
import { DashboardFeedback } from '../entities/dashboard-feedback.entity';
import { DashboardMetric } from '../entities/dashboard-metric.entity';
import { DashboardOrigin } from '../entities/dashboard-origin.entity';
import { DashboardResponsible } from '../entities/dashboard-responsibles.entity';
import { Dashboard } from '../entities/dashboard.entity';
import { DashboardFrequencyUpdate } from '../enums/dashboard-frequency-update.enum';
import { DashboardPolarity } from '../enums/dashboard-polarity.enum';
import { DashboardTechnology } from '../enums/dashboard-technology.enum';

export const createDashboardFixture: CreateDashboardDto = {
  name: 'Test',
  technology: DashboardTechnology.POWER_BI,
  area: {
    name: 'Test',
  },
  campaign: 'campaign',
  description: 'description',
  isResponsive: true,
  linkDesktop: 'link',
  linkMobile: 'link',
  metrics: [
    {
      calculus: 'calculus',
      description: 'description',
      name: 'name',
      polarity: DashboardPolarity.DOWN,
    },
  ],
  origins: [
    {
      description: 'description',
      name: 'name',
    },
  ],
  responsibles: [
    {
      email: 'email',
      name: 'name',
    },
  ],
  updateFrequency: DashboardFrequencyUpdate.DAILY,
  usabilityWarning: 'usabilityWarning',
};

export const createDashboardEntityFixture: Dashboard = {
  area: {
    id: '1',
    name: createDashboardFixture.area.name,
    dashboards: new Collection<Dashboard>({}),
  },
  campaign: createDashboardFixture.campaign,
  createdAt: new Date('2024-05-30T00:00:00.000Z'),
  deleted: false,
  description: createDashboardFixture.description,
  feedbacks: new Collection<DashboardFeedback>({}),
  id: '1',
  isResponsive: createDashboardFixture.isResponsive,
  linkDesktop: createDashboardFixture.linkDesktop,
  linkMobile: createDashboardFixture.linkMobile,
  metrics: new Collection<DashboardMetric>({}),
  name: createDashboardFixture.name,
  origins: new Collection<DashboardOrigin>({}),
  responsibles: new Collection<DashboardResponsible>({}),
  technology: createDashboardFixture.technology,
  updatedAt: new Date('2024-05-30T00:00:00.000Z'),
  updateFrequency: createDashboardFixture.updateFrequency,
  usabilityWarning: createDashboardFixture.usabilityWarning,
};
