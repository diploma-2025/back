const router = require('express').Router();
const userRouter = require('../src/user/userRouter')
const appointmentRouter = require('../src/appointment/appointmentRouter')
const patientRouter = require('../src/patient/patientRouter')

router.use('/user', userRouter);
router.use('/appointment', appointmentRouter);
router.use('/patient', patientRouter)

module.exports = router;