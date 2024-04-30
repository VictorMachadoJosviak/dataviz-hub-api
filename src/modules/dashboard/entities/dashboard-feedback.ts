import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import * as crypto from 'crypto';
import { User } from '../../users/entities/user.entity';
import { Dashboard } from './dashboard.entity';

@Entity()
export class DashboardFeedback {
  @PrimaryKey({ type: 'uuid' })
  id: string = crypto.randomUUID();

  @Property()
  comment: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Dashboard)
  dashboard: Dashboard;

  @Property()
  createdAt = new Date();
}
