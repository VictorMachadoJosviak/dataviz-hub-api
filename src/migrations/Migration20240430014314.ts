import { Migration } from '@mikro-orm/migrations';

export class Migration20240430014314 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "dashboard" add column "campaign" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dashboard" drop column "campaign";');
  }

}
