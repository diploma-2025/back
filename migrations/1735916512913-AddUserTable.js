const {MigrationInterface, QueryRunner} = require("typeorm");

module.exports = class AddUserTable1735916512913 {
    name = 'AddUserTable1735916512913'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL UNIQUE, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
