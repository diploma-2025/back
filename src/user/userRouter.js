const userRouter = require("express").Router()

const {createUserValidator, authUserValidator, getUserValidator} = require("../user/userValidators")
const {
    createUser,
    assignToken,
    findUserAndAuthorize,
    findUserById,
    findAllUsers,
    removeUserById, updateUserRole
} = require("./userFunctions");
const {getTabsByRoleId, getRoleName} = require("../role/roleFunctions");
const {getAdminValidator} = require("./userValidators");

userRouter.get('/user', getUserValidator, async (req, res) => {
    try {
        const user = await findUserById(req.userId)
        user.tabs = await getTabsByRoleId(user.role)
        user.role = await getRoleName(user.role)
        return res.status(200).json(user)
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

userRouter.get("/", getUserValidator, async (req, res) => {
    try {
        const users = await findAllUsers(req.userId, req.roleId)
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

userRouter.patch('/', getAdminValidator, async (req, res) => {
    const {userId, roleId} = req.body
    try {
        if (!userId || !roleId) return res.status(400).send("Вкажіть всі поля")

        const updatedUser = await updateUserRole(userId, roleId)
        if (updatedUser.affected === 0) return res.status(404).send("Сталася помилка")

        return res.status(200).json("Роль успішно змінено")
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

userRouter.delete('/', getAdminValidator, async (req, res) => {
    try {
        await removeUserById(req.body.id)
        return res.status(200).json("Успішно видалено")
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

module.exports = userRouter;