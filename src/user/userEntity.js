const {EntitySchema} = require("typeorm")

const UserEntity = new EntitySchema({
    name: "user",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        username: {
            type: 'varchar',
            nullable: false
        },
        email: {
            type: "varchar",
            nullable: false,
            unique: true
        },
        password: {
            type: "varchar",
            nullable: false,
        },
        role: {
            type: "int",
            nullable: false
        }
    },
    relations: {
        RoleEntity: {
            type: 'many-to-one',
            target: 'role',
            joinColumn: {
                name: 'role',
                referencedColumnName: "id"
            }
        }
    }
})

module.exports = UserEntity