const {MigrationInterface, QueryRunner} = require("typeorm");

module.exports = class AddRoleTable1735922221757 {
    name = 'AddRoleTable1735922221757'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`
            INSERT INTO \`role\` (\`name\`) 
            VALUES ('АДМІН'), ('ЛІКАР'), ('МЕДСЕСТРА')
        `)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_6620cd026ee2b231beac7cfe578\` FOREIGN KEY (\`role\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_6620cd026ee2b231beac7cfe578\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }
}
