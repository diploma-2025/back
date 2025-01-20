const AppointmentEntity = require("./appointmentEntity")
const PatientEntity = require("../patient/patientEntity")
const UserEntity = require("../user/userEntity")

const AppDataSource = require("../../ormconfig")

const CustomError = require("../../vars/error")

const appointmentRepository = AppDataSource.getRepository(AppointmentEntity)
const patientRepository = AppDataSource.getRepository(PatientEntity)
const userRepository = AppDataSource.getRepository(UserEntity)

const createAppointment = async (data, userId) => {
    const existingAppointment = await appointmentRepository.findOneBy(
        {
            date: data.date,
            startTime: data.startTime,
        }
    )
    if (existingAppointment) throw new CustomError('Такий прийом вже існує', 400)

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
    let appointments = await appointmentRepository.findBy({userId: userId, date: date})
    for (let app of appointments) {
        app.user = (await userRepository.findOne({
            where: { id: app.userId },
            select: ['username']
        }))?.username
        app.patient = await patientRepository.findOneBy({id: app.patientId})
        delete app.patientId
        delete app.userId
    }
    return appointments
}


module.exports = {createAppointment, findUserAppointments}