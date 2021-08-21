import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTodos1629080783670 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: "TODO",
          columns: [
            {
              name: "TODO_ID",
              type: "uuid",
              isPrimary: true,
            },
            {
              name: "TODO_TITLE",
              type: "varchar",
            },
            {
              name: "TODO_COMPLETED",
              type: "boolean",
              default: false
            },
            {
              name: "TODO_ACTIVE",
              type: "boolean",
              default: true
            },
            {
              name: "TODO_DELETED",
              type: "boolean",
              default: false
            },
            {
              name: "TODO_USER_CREATE",
              type: "uuid"
            },
            {
              name: "TODO_USER_UPDATE",
              type: "uuid"
            },
            {
              name: "TODO_CREATED_AT",
              type: "timestamp",
              default: "now()"
            },
            {
              name: "TODO_UPDATE_AT",
              type: "timestamp"
            }
          ],
          foreignKeys: [
            {
              name: "FK_TODO_USER_CREATE",
              referencedTableName: "USER",
              referencedColumnNames: ["USER_ID"],
              columnNames: ["TODO_USER_CREATE"],
              onDelete: "SET NULL",
              onUpdate: "SET NULL"
            },
            {
              name: "FK_TODO_USER_UPDATE",
              referencedTableName: "USER",
              referencedColumnNames: ["USER_ID"],
              columnNames: ["TODO_USER_UPDATE"],
              onDelete: "SET NULL",
              onUpdate: "SET NULL"
            }
          ]
        }
      )
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('TODO');
  }

}
