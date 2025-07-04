import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDeveloperRelationToGames1751625190193 implements MigrationInterface {
    name = 'AddDeveloperRelationToGames1751625190193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" ADD "developer_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_2ec2552bfa119d8743c844ef114" FOREIGN KEY ("developer_id") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_2ec2552bfa119d8743c844ef114"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "developer_id"`);
    }

}
