const {EntitySchema} = require("typeorm")

const RoleEntity = new EntitySchema({
    name: 'role',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'varchar',
            unique: true
        },
    }
})

module.exports = RoleEntity