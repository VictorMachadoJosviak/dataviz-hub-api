import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Dashboard } from './dashboard.entity';

@Entity()
export class DashboardOrigin {
  @PrimaryKey({ type: 'uuid' })
  id: string = crypto.randomUUID();

  @Property()
  name: string;

  @Property()
  description: string;

  @ManyToOne(() => Dashboard)
  dashboard: Dashboard;

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();
}
