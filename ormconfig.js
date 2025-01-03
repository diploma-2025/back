const {DataSource} = require("typeorm")
const {db} = require("./vars/config")
const Entities = require("./vars/entities");

const AppDataSource = new DataSource({
    type: 'mysql',
    host: db.host,
    port: db.port,
    username: db.user,
    database: db.database,
    password: db.password,
    entities: Entities,
    synchronize: false,
    logging: false,
    migrations: ["./migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true
})

module.exports = AppDataSource