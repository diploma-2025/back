const CustomError = require("./error")
const nodemailer = require("nodemailer");
const {mailer} = require("./config");

const sendEmail = async (gmail, password) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: mailer
        })

        const mailOptions = {
            from: mailer.user,
            to: gmail,
            subject: 'Ваш пароль для входу в кабінет',
            text: `Пароль для входу в кабінет: ${password}`
        }
        await transporter.sendMail(mailOptions)
    } catch (err) {
        console.log(err)
        throw new CustomError('Емайл не надіслано', 400)
    }
}

module.exports = {sendEmail}
