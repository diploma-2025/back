const {EntitySchema} = require("typeorm")

const PatientEntity = new EntitySchema({
    name: "patient",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        username: {
            type: "varchar",
            nullable: false,
            unique: true,
        },
        phone: {
            type: "simple-array",
            nullable: true,
        },
        isDeleted: {
            type: 'boolean',
            default: false,
        }
    },
    relations: {
        users: {
            type: 'many-to-many',
            target: 'user',
            inverseSide: 'patients',
        }
    }
})

module.exports = PatientEntity
