import { Migration } from '@mikro-orm/migrations';

export class Migration20240329183136 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "dashboard" rename column "tecnology" to "technology";',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "dashboard" rename column "technology" to "tecnology";',
    );
  }
}
