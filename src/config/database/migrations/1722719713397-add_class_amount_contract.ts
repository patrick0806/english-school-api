import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddClassAmountContract1722719713397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('school_member_contracts', [
      new TableColumn({
        name: 'amount_classes_weekly',
        type: 'int',
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'school_member_contracts',
      'amount_classes_weekly',
    );
  }
}
