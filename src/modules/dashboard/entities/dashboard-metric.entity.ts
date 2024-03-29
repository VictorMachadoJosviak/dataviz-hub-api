import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { DashboardPolarity } from '../enums/dashboard-polarity.enum';
import { Dashboard } from './dashboard.entity';

@Entity()
export class DashboardMetric {
  @PrimaryKey({ type: 'uuid' })
  id: string = crypto.randomUUID();

  @Property()
  name: string;

  @Property()
  calculus: string;

  @Enum(() => DashboardPolarity)
  polarity: DashboardPolarity;

  @ManyToOne(() => Dashboard)
  dashboard: Dashboard;

  @Property()
  description: string;

  @Property()
  createdAt: Date;

  @Property()
  updatedAt: Date;
}
