const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const AppDataSource = require('../../ormconfig')
const UserEntity = require("./userEntity")

const CustomError = require("../../vars/error")
const {jwt} = require("../../vars/config")
const {Not} = require("typeorm");
const {sendEmail} = require("../../vars/nodemailer");

const userRepository = AppDataSource.getRepository(UserEntity)

const generatePassword = async () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength))
    return result
}

const createUser = async (data) => {
    const password = await generatePassword()
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = userRepository.create({
        email: data.email,
        password: hashedPassword,
        username: data.username,
        role: data.roleId || 3
    })

    await userRepository.save(user)
    await sendEmail(data.email, password)

    return user
}

const createNurse = async (data, userId) => {
    const doctor = await userRepository.findOneBy({id: userId})
    if (!doctor) throw new CustomError("Лікаря не знайдено", 401)

    const password = await generatePassword()
    const hashedPassword = await bcrypt.hash(password, 10)
    const nurse = userRepository.create({
        email: data.email,
        password: hashedPassword,
        username: data.username,
        role: 3,
        createdBy: {id: doctor.id}
    })
    await userRepository.save(nurse)
    await sendEmail(data.email, password)
    return nurse
}

const findAllUsers = async (userId) => {
    return await userRepository.findBy({id: Not(userId)})
}

const findAllNurses = async (userId) => {
    return await userRepository.findBy({createdBy: {id: userId}})
}

const findUserById = async (userId) => {
    const user = await userRepository.findOneBy({id: userId})
    if (!user) throw new CustomError('Невірно вказані дані', 404)
    delete user.password
    return user
}

const findUserAndAuthorize = async (data) => {
    const user = await userRepository.findOneBy({email: data.email})
    if (!user) throw new CustomError('Невірно вказані дані', 404)

    if (!await bcrypt.compare(data.password, user.password)) throw new CustomError('Невірно вказані дані', 404)
    return user
}

const updateUser = async (userId, username, roleId) => {
    return await userRepository.update(userId, {username: username, role: roleId})
}

const removeUserById = async (userId) => {
    return await userRepository.delete({id: userId})
}

//TOKEN
const assignToken = (userId, roleId) => {
    return jsonwebtoken.sign({id: userId, roleId: roleId}, jwt.secretKey, {expiresIn: '8h'})
}

const verifyToken = (token) => {
    return jsonwebtoken.verify(token, jwt.secretKey);
}

module.exports = {
    createUser, createNurse,
    findAllUsers, findUserAndAuthorize, findUserById, findAllNurses,
    updateUser,
    removeUserById,
    assignToken, verifyToken
}
