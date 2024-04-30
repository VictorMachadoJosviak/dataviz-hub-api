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
import { DashboardFeedback } from './dashboard-feedback';
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
  technology: DashboardTechnology;

  @Property()
  description: string;

  @Property({ type: 'text' })
  linkDesktop: string;

  @Property({ type: 'text' })
  linkMobile: string;

  @Property()
  isResponsive: boolean;

  @OneToMany(() => DashboardMetric, (metric) => metric.dashboard, {
    orphanRemoval: true,
  })
  metrics = new Collection<DashboardMetric>(this);

  @OneToMany(() => DashboardOrigin, (origin) => origin.dashboard, {
    orphanRemoval: true,
  })
  origins = new Collection<DashboardOrigin>(this);

  @OneToMany(
    () => DashboardResponsible,
    (responsible) => responsible.dashboard,
    { orphanRemoval: true },
  )
  responsibles = new Collection<DashboardResponsible>(this);

  @OneToMany(() => DashboardFeedback, (feedback) => feedback.dashboard, {
    orphanRemoval: true,
  })
  feedbacks = new Collection<DashboardFeedback>(this);

  @Property({
    nullable: true,
  })
  campaign: string;

  @ManyToOne(() => DashboardArea)
  area: DashboardArea;

  @Enum(() => DashboardFrequencyUpdate)
  updateFrequency: DashboardFrequencyUpdate;

  @Property()
  usabilityWarning: string;

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();

  @Property({
    default: false,
  })
  deleted: boolean;
}
