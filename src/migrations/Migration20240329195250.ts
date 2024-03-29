import { Migration } from '@mikro-orm/migrations';

export class Migration20240329195250 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "dashboard_responsible" add column "email" varchar(255) null;');
    this.addSql('alter table "dashboard_responsible" rename column "user_id" to "name";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dashboard_responsible" drop column "email";');

    this.addSql('alter table "dashboard_responsible" rename column "name" to "user_id";');
  }

}
