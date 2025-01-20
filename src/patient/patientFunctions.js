const AppDataSource = require("../../ormconfig")
const PatientEntity = require("./patientEntity")

const patientRepository = AppDataSource.getRepository(PatientEntity)

const createPatient = async (data) => {
    const patient = await patientRepository.create({
        username: data.username,
        phone: data.phone,
    })

    return await patientRepository.save(patient)
}

const getPatients = async (patientId) => {
    let patient = await patientRepository.findBy({id: patientId})
    if (patientId && patient.length === 1) patient = patient[0]
    return patient
}

module.exports = {createPatient, getPatients}