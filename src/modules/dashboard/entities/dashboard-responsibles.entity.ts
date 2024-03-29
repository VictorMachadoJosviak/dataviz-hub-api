import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Dashboard } from './dashboard.entity';

@Entity()
export class DashboardResponsible {
  @PrimaryKey({ type: 'uuid' })
  id: string = crypto.randomUUID();

  @Property()
  userId: string;

  @ManyToOne(() => Dashboard)
  dashboard: Dashboard;
}
