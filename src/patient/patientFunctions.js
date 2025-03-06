const AppDataSource = require("../../ormconfig")
const PatientEntity = require("./patientEntity")
const CustomError = require("../../vars/error");

const patientRepository = AppDataSource.getRepository(PatientEntity)

const createPatient = async (data) => {
    let patient = await patientRepository.findOneBy({username: data.username})
    if (!patient) patient = await patientRepository.create({
        username: data.username,
        phone: [data.phone],
    })
    else if (!patient.phone.includes(data.phone)) patient.phone.push(data.phone)
    else throw new CustomError("Пацієнт вже записаинй", 400)

    return await patientRepository.save(patient)
}

const getPatientById = async (patientId) => {
    return await patientRepository.findOneBy({id: patientId})
}

const getPatients = async () => {
    return await patientRepository.find({})
}

const updatePatient = async (data, patientId) => {
    delete data.patientId
    return await patientRepository.update({id: patientId}, data)
}

module.exports = {createPatient, getPatientById, getPatients, updatePatient}