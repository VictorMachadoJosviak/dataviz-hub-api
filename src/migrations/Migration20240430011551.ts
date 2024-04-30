import { Migration } from '@mikro-orm/migrations';

export class Migration20240430011551 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "dashboard" drop constraint if exists "dashboard_technology_check";');

    this.addSql('alter table "dashboard" alter column "technology" type text using ("technology"::text);');
    this.addSql('alter table "dashboard" add constraint "dashboard_technology_check" check ("technology" in (\'POWER_BI\', \'TABLEAU\', \'QLIK_VIEW\', \'LOOKER_STUDIO\'));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dashboard" drop constraint if exists "dashboard_technology_check";');

    this.addSql('alter table "dashboard" alter column "technology" type text using ("technology"::text);');
    this.addSql('alter table "dashboard" add constraint "dashboard_technology_check" check ("technology" in (\'POWER_BI\', \'TABLEAU\', \'QLIK_VIEW\', \'LOOKER_STODIO\'));');
  }

}
