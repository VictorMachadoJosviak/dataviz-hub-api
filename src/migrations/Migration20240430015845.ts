import { Migration } from '@mikro-orm/migrations';

export class Migration20240430015845 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "dashboard_feedback" ("id" uuid not null, "comment" varchar(255) not null, "user_id" uuid not null, "dashboard_id" uuid not null, "created_at" timestamptz not null, constraint "dashboard_feedback_pkey" primary key ("id"));');

    this.addSql('alter table "dashboard_feedback" add constraint "dashboard_feedback_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "dashboard_feedback" add constraint "dashboard_feedback_dashboard_id_foreign" foreign key ("dashboard_id") references "dashboard" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "dashboard_feedback" cascade;');
  }

}
