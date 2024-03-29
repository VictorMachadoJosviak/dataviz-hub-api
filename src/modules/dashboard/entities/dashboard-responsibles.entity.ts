import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Dashboard } from './dashboard.entity';

@Entity()
export class DashboardResponsible {
  @PrimaryKey({ type: 'uuid' })
  id: string = crypto.randomUUID();

  @Property()
  name: string;

  @Property({
    nullable: true,
  })
  email: string;

  @ManyToOne(() => Dashboard)
  dashboard: Dashboard;
}
