const router = require('express').Router();
const userRouter = require('../src/user/userRouter')
const appointmentRouter = require('../src/appointment/appointmentRouter')
const patientRouter = require('../src/patient/patientRouter')
const roleRouter = require('../src/role/roleRouter')

router.use('/user', userRouter);
router.use('/appointment', appointmentRouter);
router.use('/patient', patientRouter)
router.use('/roles', roleRouter)

module.exports = router;