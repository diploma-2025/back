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
            type: "varchar",
            unique: true,
        }
    }
})

module.exports = PatientEntity