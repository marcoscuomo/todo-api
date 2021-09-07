import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUserToken1630812140159 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'USERS_TOKEN',
        columns: [
          {
            name: 'USTO_ID',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'USTO_REFRESH_TOKEN',
            type: 'varchar'
          },
          {
            name: 'USTO_USER_ID',
            type: 'uuid'
          },
          {
            name: 'USTO_EXPIRES_DATE',
            type: 'timestamp'
          },
          {
            name: 'USTO_CREATED_AT',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKUserToken',
            referencedTableName: 'USER',
            referencedColumnNames: ['USER_ID'],
            columnNames: ['USTO_USER_ID'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('USERS_TOKEN')
  }
}
