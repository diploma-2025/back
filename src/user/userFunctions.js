const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const AppDataSource = require('../../ormconfig')
const UserEntity = require("./userEntity")

const CustomError = require("../../vars/error")
const {jwt} = require("../../vars/config")

const userRepository = AppDataSource.getRepository(UserEntity)

const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = userRepository.create({
        email: data.email,
        password: hashedPassword,
        username: data.username,
        role: data.roleId || 3
    })

    return await userRepository.save(user)
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

//TOKEN
const assignToken = (userId) => {
    return jsonwebtoken.sign({id: userId}, jwt.secretKey, {expiresIn: '8h'})
}

const verifyToken = (token) => {
    return jsonwebtoken.verify(token, jwt.secretKey);
}
module.exports = {
    createUser, findUserAndAuthorize, findUserById,
    assignToken, verifyToken
}