import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import * as crypto from 'crypto';
import { DashboardFrequencyUpdate } from '../enums/dashboard-frequency-update.enum';
import { DashboardTechnology } from '../enums/dashboard-technology.enum';
import { DashboardArea } from './dashboard-area.entity';
import { DashboardMetric } from './dashboard-metric.entity';
import { DashboardOrigin } from './dashboard-origin.entity';
import { DashboardResponsible } from './dashboard-responsibles.entity';

@Entity()
export class Dashboard {
  @PrimaryKey({ type: 'uuid' })
  id: string = crypto.randomUUID();

  @Property()
  name: string;

  @Enum(() => DashboardTechnology)
  tecnology: DashboardTechnology;

  @Property()
  description: string;

  @Property({ type: 'text' })
  linkDesktop: string;

  @Property({ type: 'text' })
  linkMobile: string;

  @Property()
  isResponsive: boolean;

  @OneToMany(() => DashboardMetric, (metric) => metric.dashboard)
  metrics = new Collection<DashboardMetric>(this);

  @OneToMany(() => DashboardOrigin, (origin) => origin.dashboard)
  origin = new Collection<DashboardOrigin>(this);

  @OneToMany(() => DashboardResponsible, (responsible) => responsible.dashboard)
  responsibles = new Collection<DashboardResponsible>(this);

  @ManyToOne(() => DashboardArea)
  area: DashboardArea;

  @Enum(() => DashboardFrequencyUpdate)
  updateFrequency: DashboardFrequencyUpdate;

  @Property()
  usabilityWarning: string;

  @Property()
  createdAt: Date;

  @Property()
  updatedAt: Date;

  @Property()
  deleted: boolean;
}
