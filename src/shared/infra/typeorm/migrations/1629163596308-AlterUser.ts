import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterUser1629163596308 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "USER_TOKEN"`);         
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "USER" ADD COLUMN USER_TOKEN VARCHAR`);
  }

}
