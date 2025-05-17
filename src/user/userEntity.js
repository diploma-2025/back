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
        },
        patients: {
            type: 'many-to-many',
            target: 'patient',
            joinTable: {
                name: "users_patients",
                joinColumn: {name: "userId", referencedColumnName: "id"},
                inverseJoinColumn: {name: "patientId", referencedColumnName: "id"}
            }
        },
        createdBy: {
            type: 'many-to-one',
            target: 'user',
            joinColumn: {
                name: 'createdBy',
                referencedColumnName: "id"
            },
            nullable: true,
        },
    }
})

module.exports = UserEntity
