const {body, validationResult} = require("express-validator")
const {getPatientById} = require("../patient/patientFunctions");

const createAppointmentValidator = [
    body('date')
        .notEmpty()
        .withMessage("Потрібно вказати дату прийому")
        .isDate()
        .withMessage('Погано вказана дата прийому'),
    body('startTime')
        .notEmpty()
        .withMessage("Потрібно вказати початок прийому")
        .isString()
        .withMessage("Вкажіть правильно годину")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("Вкажіть правильно годину"),
    body('endTime')
        .optional()
        .notEmpty()
        .withMessage("Потрібно вказати кінець прийому")
        .isString()
        .withMessage("Вкажіть правильно годину")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("Вкажіть правильно годину"),
    body('patientId')
        .notEmpty()
        .withMessage("Потрібно вказати пацієнта")
        .isInt()
        .withMessage('Вкажіть правильно пацієнта'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
        next()
    }
]

module.exports = {createAppointmentValidator}