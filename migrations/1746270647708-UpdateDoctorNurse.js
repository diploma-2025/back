const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UpdateDoctorNurse1746270647708 {
    name = 'UpdateDoctorNurse1746270647708'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_82319f64187836b307e6d6ba08d\` FOREIGN KEY (\`createdBy\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_82319f64187836b307e6d6ba08d\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdBy\``);
    }
}
