const {body, validationResult, header} = require("express-validator")
const {verifyToken} = require("./userFunctions");
const rateLimit = require("express-rate-limit");

const authRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "Забагато спроб авторизації"
})

const createUserValidator = [
    body('email').isEmail().withMessage("Неправильний емайл"),
    body('username').isString()
        .matches(/^[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ][а-яіїє']+$/u)
        .withMessage("Ім'я користувача повинно бути у форматі 'Прізвище Ім'я По батькові'"),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
        next()
    }
]

const authUserValidator = [
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
        req.roleId = user.roleId
        return true
    }),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(401).json({errors: errors.array()})
        next()
    }
]

const getAdminValidator = [
    header('Authorization').custom((value, {req}) => {
        if (!value) throw new Error('Потрібна авторизація')

        const user = verifyToken(value.replace('Bearer ', ''))
        if (user.roleId !== 1) throw new Error('Куди розігнався?')
        req.userId = user.id
        return true
    }),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(401).json({errors: errors.array()})
        next()
    }
]

module.exports = {authRateLimiter, createUserValidator, authUserValidator, getUserValidator, getAdminValidator}
