const UserEntity = require('../src/user/userEntity');
const RoleEntity = require('../src/role/roleEntity');
const AppointmentEntity = require('../src/appointment/appointmentEntity')
const PatientEntity = require("../src/patient/patientEntity");

const Entities = [
    UserEntity,
    RoleEntity,
    AppointmentEntity,
    PatientEntity,
]

module.exports = Entities