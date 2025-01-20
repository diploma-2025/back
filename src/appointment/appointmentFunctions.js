const AppointmentEntity = require("./appointmentEntity")
const AppDataSource = require("../../ormconfig");
const CustomError = require("../../vars/error");

const appointmentRepository = AppDataSource.getRepository(AppointmentEntity)

const createAppointment = async (data) => {
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
        userId: data.userId,
    })

    return await appointmentRepository.save(appointment)
}

const findUserAppointments = async (userId, date) => {
    return await appointmentRepository.findBy({userId: userId, date: date})
}

module.exports = {createAppointment, findUserAppointments}