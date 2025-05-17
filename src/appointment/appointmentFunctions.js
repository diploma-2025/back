const AppointmentEntity = require("./appointmentEntity")
const PatientEntity = require("../patient/patientEntity")
const UserEntity = require("../user/userEntity")

const AppDataSource = require("../../ormconfig")

const CustomError = require("../../vars/error")
const {MoreThan, LessThan} = require("typeorm");

const appointmentRepository = AppDataSource.getRepository(AppointmentEntity)
const patientRepository = AppDataSource.getRepository(PatientEntity)
const userRepository = AppDataSource.getRepository(UserEntity)

const convertToDate = (time) => {
    const [hours, minutes] = time.split(':')
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    return date.getTime()
}

const createAppointment = async (data, userId) => {
    const existingAppointment = await appointmentRepository.findOne({
        where: {
            date: data.date,
            startTime: LessThan(data.endTime),
            endTime: MoreThan(data.startTime)
        }
    });

    if (existingAppointment) {
        throw new CustomError(`Прийом з ${existingAppointment.startTime} до ${existingAppointment.endTime} вже існує. Ви не можете забронювати цей час.`, 400);
    }

    const appointment = await appointmentRepository.create({
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        userId: userId,
        patientId: data.patientId
    })

    return await appointmentRepository.save(appointment)
}

const findUserAppointments = async (userId, date) => {

    let appointments = await appointmentRepository.find({
        where: {userId: userId, date: date},
        select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
            user: {
                id: true,
                username: true
            },
            patient: {
                id: true,
                username: true,
                isDeleted: true
            }
        },
        relations: ['user', 'patient'],
    })
    return appointments?.filter(app => app.patient.isDeleted === false)
}


module.exports = {createAppointment, findUserAppointments}
