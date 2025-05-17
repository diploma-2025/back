const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UpdateUsersPatients1746266806899 {
    name = 'UpdateUsersPatients1746266806899'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_5ce4c3130796367c93cd817948e\``);
        await queryRunner.query(`DROP INDEX \`email\` ON \`user\``);
        await queryRunner.query(`CREATE TABLE \`users_patients\` (\`userId\` int NOT NULL, \`patientId\` int NOT NULL, INDEX \`IDX_c8f31c02977791503d00ec433c\` (\`userId\`), INDEX \`IDX_fb75bbbc00e2ca2ab86c165369\` (\`patientId\`), PRIMARY KEY (\`userId\`, \`patientId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_5ce4c3130796367c93cd817948e\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_patients\` ADD CONSTRAINT \`FK_c8f31c02977791503d00ec433cf\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_patients\` ADD CONSTRAINT \`FK_fb75bbbc00e2ca2ab86c1653692\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users_patients\` DROP FOREIGN KEY \`FK_fb75bbbc00e2ca2ab86c1653692\``);
        await queryRunner.query(`ALTER TABLE \`users_patients\` DROP FOREIGN KEY \`FK_c8f31c02977791503d00ec433cf\``);
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_5ce4c3130796367c93cd817948e\``);
        await queryRunner.query(`DROP INDEX \`IDX_fb75bbbc00e2ca2ab86c165369\` ON \`users_patients\``);
        await queryRunner.query(`DROP INDEX \`IDX_c8f31c02977791503d00ec433c\` ON \`users_patients\``);
        await queryRunner.query(`DROP TABLE \`users_patients\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`email\` ON \`user\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_5ce4c3130796367c93cd817948e\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
