const {body, validationResult, header} = require("express-validator")
const {token} = require("morgan");
const CustomError = require("../../vars/error");
const {verifyToken} = require("./userFunctions");

const createUserValidator = [
    body('email').isEmail().withMessage("Неправильний емайл"),
    body('password').isLength({min: 6}).withMessage("Пароль має бути не менше 6 символів"),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
        next()
    }
]

const getUserValidator = [
    header('Authorization').custom((value, {req}) => {
        if (!value) throw new Error('Потрібна авторизація')

        const user = verifyToken(value.replace('Bearer ', ''))
        req.userId = user.id
        return true
    }),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(401).json({errors: errors.array()})
        next()
    }
]

module.exports = {createUserValidator, getUserValidator}