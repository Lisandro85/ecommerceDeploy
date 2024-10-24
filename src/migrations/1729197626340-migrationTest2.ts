import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationTest21729197626340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "users" RENAME COLUMN "name" TO "fullname"')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "users" RENAME COLUMN "fullname" TO "name"') 
    }

}
