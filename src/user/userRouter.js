const userRouter = require("express").Router()

const {createUserValidator, authUserValidator, getUserValidator} = require("../user/userValidators")
const {createUser, assignToken, findUserAndAuthorize, findUserById, findAllUsers} = require("./userFunctions");
const {getTabsByRoleId, getRoleName} = require("../role/roleFunctions");
const {getAdminValidator} = require("./userValidators");

userRouter.get('/', getUserValidator, async (req, res) => {
    try {
        const user = await findUserById(req.userId)
        user.tabs = await getTabsByRoleId(user.role)
        user.role = await getRoleName(user.role)
        return res.status(200).json(user)
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

userRouter.get("/users", getAdminValidator, async (req, res) => {
    try {
        const users = await findAllUsers(req.userId)
        for (let user of users) {
            delete user.password
            user.role = await getRoleName(user.role)
        }
        return res.status(200).json(users)
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

userRouter.post("/", getAdminValidator, createUserValidator, async (req, res) => {
    try {
        const user = await createUser(req.body)
        if (!user) return res.status(400).send("Користувача не створено")

        const token = assignToken(user.id)

        return res.status(201).json({message: "Користувача успішно створено", accessToken: token})
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

userRouter.post('/authorization', authUserValidator, async (req, res) => {
    try {
        const user = await findUserAndAuthorize(req.body)
        if (!user) return res.status(404).send("Користувача не знайдено")

        const token = assignToken(user.id, user.role)
        return res.status(201).json({message: "Авторизація успішна", accessToken: token})
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

module.exports = userRouter;