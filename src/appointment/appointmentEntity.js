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
            type: 'timestamp',
            required: true,
            nullable: false
        },
        startTime: {
            type: 'varchar',
            length: 5,
            required: true,
        },
        endTime: {
            type: 'varchar',
            length: 5,
        },
        userId: {
            type: 'int',
            required: true,
            nullable: false,
        },
        patientId: {
            type: 'int',
            required: true,
            nullable: false,
        }
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'user',
            joinColumn: {
                name: 'userId',
                referencedColumnName: "id"
            }
        },
        patient: {
            type: 'many-to-one',
            target: 'patient',
            joinColumn: {
                name: 'patientId',
                referencedColumnName: "id"
            }
        }
    }
})

module.exports = AppointmentEntity
