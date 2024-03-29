import { Migration } from '@mikro-orm/migrations';

export class Migration20240329175947 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "dashboard_area" ("id" uuid not null, "name" varchar(255) not null, constraint "dashboard_area_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "dashboard" ("id" uuid not null, "name" varchar(255) not null, "tecnology" text check ("tecnology" in (\'POWER_BI\', \'TABLEAU\', \'QLIK_VIEW\', \'LOOKER_STODIO\')) not null, "description" varchar(255) not null, "link_desktop" text not null, "link_mobile" text not null, "is_responsive" boolean not null, "area_id" uuid not null, "update_frequency" text check ("update_frequency" in (\'DAILY\', \'WEEKLY\', \'MONTHLY\', \'QUARTERLY\', \'SEMI_ANNUALLY\', \'ANNUALLY\')) not null, "usability_warning" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted" boolean not null, constraint "dashboard_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "dashboard_metric" ("id" uuid not null, "name" varchar(255) not null, "calculus" varchar(255) not null, "polarity" text check ("polarity" in (\'UP\', \'DOWN\')) not null, "dashboard_id" uuid not null, "description" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "dashboard_metric_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "dashboard_origin" ("id" uuid not null, "name" varchar(255) not null, "description" varchar(255) not null, "dashboard_id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "dashboard_origin_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "dashboard_responsible" ("id" uuid not null, "user_id" varchar(255) not null, "dashboard_id" uuid not null, constraint "dashboard_responsible_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "dashboard" add constraint "dashboard_area_id_foreign" foreign key ("area_id") references "dashboard_area" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "dashboard_metric" add constraint "dashboard_metric_dashboard_id_foreign" foreign key ("dashboard_id") references "dashboard" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "dashboard_origin" add constraint "dashboard_origin_dashboard_id_foreign" foreign key ("dashboard_id") references "dashboard" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "dashboard_responsible" add constraint "dashboard_responsible_dashboard_id_foreign" foreign key ("dashboard_id") references "dashboard" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "dashboard" drop constraint "dashboard_area_id_foreign";',
    );

    this.addSql(
      'alter table "dashboard_metric" drop constraint "dashboard_metric_dashboard_id_foreign";',
    );

    this.addSql(
      'alter table "dashboard_origin" drop constraint "dashboard_origin_dashboard_id_foreign";',
    );

    this.addSql(
      'alter table "dashboard_responsible" drop constraint "dashboard_responsible_dashboard_id_foreign";',
    );

    this.addSql('drop table if exists "dashboard_area" cascade;');

    this.addSql('drop table if exists "dashboard" cascade;');

    this.addSql('drop table if exists "dashboard_metric" cascade;');

    this.addSql('drop table if exists "dashboard_origin" cascade;');

    this.addSql('drop table if exists "dashboard_responsible" cascade;');
  }
}
