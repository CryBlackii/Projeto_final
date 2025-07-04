import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDeveloper1751606129240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'developer',
                columns: [
                    {name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                    {name: 'name', type: 'varchar'},
                    {name: 'pais_de_origem', type: 'varchar'},
                    {name: 'fundacao', type: 'date'},
                    {name: 'sede', type: 'varchar'},
                    {name: 'site', type: 'varchar'},
                    {name: 'created_at', type: 'timestamp', default: 'now()'},
                    {name: 'updated_at', type: 'timestamp', default: 'now()'}
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('developer');
    }
}