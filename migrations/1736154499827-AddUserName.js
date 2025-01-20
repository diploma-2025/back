const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddUserName1736154499827 {
    name = 'AddUserName1736154499827'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
    }
}
