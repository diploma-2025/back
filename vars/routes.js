const router = require('express').Router();
const userRouter = require('../src/user/userRouter')

router.use('/user', userRouter);

module.exports = router;