const patientRouter = require('express').Router()

const {getUserValidator} = require("../user/userValidators")
const {createPatient, getPatients, getPatientById, updatePatient} = require("./patientFunctions");
const {createPatientValidator, updatePatientValidator} = require("./patientValidators")
const {updateUserRole} = require("../user/userFunctions");

patientRouter.get('/', getUserValidator, async (req, res) => {
    try {
        const patients = await getPatients()
        return res.status(200).json(patients)
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

patientRouter.get('/patient', getUserValidator, async (req, res) => {
    const {patientId} = req.query;
    try {
        const patient = await getPatientById(patientId)
        return res.status(200).json(patient)
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

patientRouter.post('/', getUserValidator, createPatientValidator, async (req, res) => {
    try {
        const patient = await createPatient(req.body)
        if (!patient) return res.status(400).json({error: 'Пацієнта не створено'})

        return res.status(201).json({id: patient.id})
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

patientRouter.patch('/patient', getUserValidator, updatePatientValidator, async (req, res) => {
    const {patientId} = req.body;
    try {
        const updatedPatient = await updatePatient(req.body, patientId)
        if (updatedPatient.affected === 0) return res.status(404).send("Сталася помилка")
        return res.status(201).json("Пацієнта успішно змінено")
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

module.exports = patientRouter