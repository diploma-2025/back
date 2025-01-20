const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddAppointmentTable1737288725182 {
    name = 'AddAppointmentTable1737288725182'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`appointment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` datetime NOT NULL, \`startTime\` varchar(255) NOT NULL, \`endTime\` varchar(255) NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_2a990a304a43ccc7415bf7e3a99\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_2a990a304a43ccc7415bf7e3a99\``);
        await queryRunner.query(`DROP TABLE \`appointment\``);
    }
}
