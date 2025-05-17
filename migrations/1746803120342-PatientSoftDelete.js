const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class PatientSoftDelete1746803120342 {
    name = 'PatientSoftDelete1746803120342'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`patient\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`patient\` DROP COLUMN \`isDeleted\``);
    }
}
