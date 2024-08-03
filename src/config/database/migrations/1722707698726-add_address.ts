import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddAddress1722707698726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criação da tabela `addresses`
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'street',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'zip_code',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'school_member_id',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['school_member_id'],
            referencedTableName: 'school_members',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            name: 'FK_SchoolMember',
          }),
        ],
      }),
      true,
    );

    // Adiciona a coluna `address_id` na tabela `school_members`
    await queryRunner.addColumn(
      'school_members',
      new TableColumn({
        name: 'address_id',
        type: 'int',
        isNullable: true,
      }),
    );

    // Adiciona a chave estrangeira `address_id`
    await queryRunner.createForeignKey(
      'school_members',
      new TableForeignKey({
        columnNames: ['address_id'],
        referencedTableName: 'addresses',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        name: 'FK_Address',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a chave estrangeira
    const table = await queryRunner.getTable('school_members');
    const foreignKey = table.foreignKeys.find((fk) => fk.name === 'FK_Address');
    if (foreignKey) {
      await queryRunner.dropForeignKey('school_members', foreignKey);
    }

    // Remover a coluna `address_id` na tabela `school_members`
    await queryRunner.dropColumn('school_members', 'address_id');

    // Remover a tabela `addresses`
    await queryRunner.dropTable('addresses');
  }
}
