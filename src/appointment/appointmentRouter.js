const {createAppointmentValidator} = require("./appointmentValidators");
const {createAppointment, findUserAppointments} = require("./appointmentFunctions");
const {getUserValidator} = require("../user/userValidators");
const {getPatientById} = require("../patient/patientFunctions");
const appointmentRouter = require("express").Router()

appointmentRouter.get("/", getUserValidator, async (req, res) => {
    const {date} = req.query;
    try {
        if (!date) return res.status(400).send("Треба вказати дату")
        const appointments = await findUserAppointments(req.userId, date)
        return res.status(200).json(appointments)
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

appointmentRouter.post("/", getUserValidator, createAppointmentValidator, async (req, res) => {
    try {
        const patient = await getPatientById(req.patientId)
        if (!patient) return res.status(404).json({error: "Пацієнта не знайдено"})

        const appointment = await createAppointment(req.body, req.userId)
        if (!appointment) return res.status(400).send("Прийом не створено")

        return res.status(201).json({message: "Прийом створено успішно"})
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

module.exports = appointmentRouter