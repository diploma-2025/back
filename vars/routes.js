const router = require('express').Router();
const userRouter = require('../src/user/userRouter')
const appointmentRouter = require('../src/appointment/appointmentRouter')

router.use('/user', userRouter);
router.use('/appointment', appointmentRouter);

module.exports = router;