const {EntitySchema} = require("typeorm")

const AppointmentEntity = new EntitySchema({
    name: 'appointment',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        date: {
            type: Date,
            required: true,
            nullable: false
        },
        startTime: {
            type: String,
            required: true,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/
        },
        endTime: {
            type: String,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        },
        userId: {
            type: 'int',
            required: true,
            nullable: false
        }
    },
    relations: {
        UserEntity: {
            type: 'many-to-one',
            target: 'user',
            joinColumn: {
                name: 'userId',
                referencedColumnName: "id"
            }
        }
    }
})

module.exports = AppointmentEntity