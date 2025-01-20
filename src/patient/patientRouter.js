const patientRouter = require('express').Router()

const {getUserValidator} = require("../user/userValidators")
const {createPatient, getPatients} = require("./patientFunctions");
const {createPatientValidator} = require("./patientValidators")

patientRouter.get('/', getUserValidator, async (req, res) => {
    const {patientId} = req.query;
    try {
        const patients = await getPatients(patientId)
        return res.status(200).json(patients)
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

module.exports = patientRouter