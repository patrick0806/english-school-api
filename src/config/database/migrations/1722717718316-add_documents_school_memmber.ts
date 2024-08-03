import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDocumentsSchoolMemmber1722717718316
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('school_members', [
      new TableColumn({
        name: 'is_brazilian',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
      new TableColumn({
        name: 'document_value',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
      new TableColumn({
        name: 'document_type',
        type: 'varchar',
        length: '50',
        isNullable: true,
      }),
      new TableColumn({
        name: 'foreign_country_document_name',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
      new TableColumn({
        name: 'foreign_country_document_value',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('school_members', [
      'is_brazilian',
      'document_value',
      'document_type',
      'foreign_country_document_name',
      'foreign_country_document_value',
    ]);
  }
}
