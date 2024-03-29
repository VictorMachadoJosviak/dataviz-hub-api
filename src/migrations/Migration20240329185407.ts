import { Migration } from '@mikro-orm/migrations';

export class Migration20240329185407 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "dashboard" alter column "deleted" type boolean using ("deleted"::boolean);');
    this.addSql('alter table "dashboard" alter column "deleted" set default false;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dashboard" alter column "deleted" drop default;');
    this.addSql('alter table "dashboard" alter column "deleted" type boolean using ("deleted"::boolean);');
  }

}
