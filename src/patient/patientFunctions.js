const AppDataSource = require("../../ormconfig")
const PatientEntity = require("./patientEntity")
const CustomError = require("../../vars/error");
const UserEntity = require("../user/userEntity");

const patientRepository = AppDataSource.getRepository(PatientEntity)
const userRepository = AppDataSource.getRepository(UserEntity)

const createPatient = async (data, userId) => {
    const user = await userRepository.findOne({where: {id: userId}, relations: ['patients']});
    const nurses = await userRepository.find({where: {createdBy: {id: userId}}, relations: ['patients']});
    let patient = await patientRepository.findOneBy({username: data.username})
    if (!patient) patient = await patientRepository.create({
        username: data.username,
        phone: [data.phone],
    })
    else if (!patient.phone.includes(data.phone)) patient.phone.push(data.phone)
    else throw new CustomError("Пацієнт вже записаинй", 400)

    await patientRepository.save(patient)

    if (!user?.patients.some(p => p.id === patient.id)) {
        user.patients.push(patient)
        for (let nurse of nurses) {
            nurse?.patients.push(patient)
            await userRepository.save(nurse)
        }
    } else throw new CustomError("Пацієнт вже записаинй", 400)

    await userRepository.save(user)

    return patient
}

const getPatientById = async (patientId) => {
    return await patientRepository.findOneBy({id: patientId, isDeleted: false})
}

const getPatients = async (userId) => {
    const user = await userRepository.findOne({where: {id: userId}, relations: ['patients']});
    const activePatients = user?.patients?.filter(patient => patient.isDeleted === false)
    return activePatients || []
}

const updatePatient = async (data, patientId) => {
    delete data.patientId
    return await patientRepository.update({id: patientId}, data)
}

const removePatientById = async (patientId) => {
    return await patientRepository.update({id: patientId}, {isDeleted: true})
}

module.exports = {createPatient, getPatientById, getPatients, updatePatient, removePatientById}
