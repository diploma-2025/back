const router = require('express').Router();
const userRouter = require('../src/user/userRouter')
const appointmentRouter = require('../src/appointment/appointmentRouter')
const patientRouter = require('../src/patient/patientRouter')
const roleRouter = require('../src/role/roleRouter')

router.use('/users', userRouter);
router.use('/appointments', appointmentRouter);
router.use('/patients', patientRouter)
router.use('/roles', roleRouter)

module.exports = router;