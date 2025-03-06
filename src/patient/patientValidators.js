const {body, validationResult} = require("express-validator")
const CustomError = require("../../vars/error");

const createPatientValidator = [
    body('username')
        .isString()
        .withMessage("Вкажіть ПІБ пацієнта")
        .matches(/^[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ][а-яіїє']+$/u)
        .withMessage("Ім'я користувача повинно бути у форматі 'Прізвище Ім'я По батькові'"),
    body('phone')
        .optional()
        .matches(/^0[5-9][0-9]{8}$/)
        .withMessage('Невірний формат номера телефону'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
        next()
    }
]

const updatePatientValidator = [
    body('patientId').isInt().withMessage("Вкажіть пацієнта"),
    body('username')
        .optional()
        .isString()
        .withMessage("Вкажіть ПІБ пацієнта")
        .matches(/^[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ][а-яіїє']+$/u)
        .withMessage("Ім'я користувача повинно бути у форматі 'Прізвище Ім'я По батькові'"),
    body("phone").optional().isArray().custom((phones) => {
        for (const phone of phones) {
            if (!/^0[5-9][0-9]{8}$/.test(phone)) {
                throw new CustomError("Некоректний формат номера телефону", 400);
            }
        }
        return true
    }),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
        next()
    }
]

module.exports = {createPatientValidator, updatePatientValidator}