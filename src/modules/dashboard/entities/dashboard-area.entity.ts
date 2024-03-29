import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Dashboard } from './dashboard.entity';

@Entity()
export class DashboardArea {
  @PrimaryKey({ type: 'uuid' })
  id: string = crypto.randomUUID();

  @Property()
  name: string;

  @OneToMany(() => Dashboard, (dashboard) => dashboard.area)
  dashboards = new Collection<Dashboard>(this);
}
