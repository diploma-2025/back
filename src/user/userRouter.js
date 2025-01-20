const userRouter = require("express").Router()

const {createUserValidator, authUserValidator, getUserValidator} = require("../user/userValidators")
const {createUser, assignToken, findUserAndAuthorize, findUserById} = require("./userFunctions");
const {getTabsByRoleId} = require("../role/roleFunctions");

userRouter.get('/', getUserValidator, async (req, res) => {
    try {
        const user = await findUserById(req.userId)
        user.tabs = await getTabsByRoleId(user.role)
        return res.status(200).json(user)
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

userRouter.post("/", createUserValidator, async (req, res) => {
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

        const token = assignToken(user.id)
        return res.status(201).json({message: "Авторизація успішна", accessToken: token})
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

module.exports = userRouter;