const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreatePatientTable1737391235528 {
    name = 'CreatePatientTable1737391235528'

    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX \`email\` ON \`user\``);
        await queryRunner.query(`CREATE TABLE \`patient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_41fa9ba0db45a508ef0b640610\` (\`username\`), UNIQUE INDEX \`IDX_62a22cef7d3cb875be95ffee3a\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD \`patientId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD \`date\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP COLUMN \`startTime\``);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD \`startTime\` varchar(5) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP COLUMN \`endTime\``);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD \`endTime\` varchar(5) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_5ce4c3130796367c93cd817948e\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_5ce4c3130796367c93cd817948e\``);
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP COLUMN \`endTime\``);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD \`endTime\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP COLUMN \`startTime\``);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD \`startTime\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD \`date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``);
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP COLUMN \`patientId\``);
        await queryRunner.query(`DROP INDEX \`IDX_62a22cef7d3cb875be95ffee3a\` ON \`patient\``);
        await queryRunner.query(`DROP INDEX \`IDX_41fa9ba0db45a508ef0b640610\` ON \`patient\``);
        await queryRunner.query(`DROP TABLE \`patient\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`email\` ON \`user\` (\`email\`)`);
    }
}
