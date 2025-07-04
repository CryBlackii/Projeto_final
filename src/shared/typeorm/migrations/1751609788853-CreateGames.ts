import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateGames1751609788853 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(new Table({
                name: 'games',
                columns: [
                    {name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                    {name: 'nome', type: 'varchar'},
                    {name: 'genero',type: 'varchar'},
                    {name: 'data_lancamento', type: 'date'},
                    {name: 'preco', type: 'decimal', precision: 10, scale: 2},
                    {name: 'descricao', type: 'text'},
                    {name: 'created_at', type: 'timestamp', default: 'now()'},
                    {name: 'updated_at', type: 'timestamp', default: 'now()'}
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('games');
    }
}