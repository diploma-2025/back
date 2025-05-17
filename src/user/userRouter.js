const userRouter = require("express").Router()

const {createUserValidator, authUserValidator, getUserValidator} = require("../user/userValidators")
const {
    createUser, createNurse,
    assignToken,
    findUserAndAuthorize,
    findUserById,
    findAllUsers,
    removeUserById,
    updateUser, findAllNurses
} = require("./userFunctions");
const {getTabsByRoleId, getRoleName, getRoleId} = require("../role/roleFunctions");
const {getAdminValidator, authRateLimiter} = require("./userValidators");

userRouter.get('/user', getUserValidator, async (req, res) => {
    try {
        const user = await findUserById(req.userId)
        user.tabs = await getTabsByRoleId(user.role)
        return res.status(200).json(user)
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

userRouter.get("/", getAdminValidator, async (req, res) => {
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

userRouter.get("/nurse", getUserValidator, async (req, res) => {
    try {
        const nurses = await findAllNurses(req.userId)
        for (let nurse of nurses) {
            delete nurse.password
            nurse.role = await getRoleName(nurse.role)
        }
        return res.status(200).json(nurses)
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

userRouter.post("/nurse", getUserValidator, createUserValidator, async (req, res) => {
    try {
        const nurse = await createNurse(req.body, req.userId)
        if (!nurse) return res.status(400).send("Медсестру не створено")

        return res.status(201).json({message: "Медсестру успішно створено"})
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

userRouter.post('/authorization', authRateLimiter, authUserValidator, async (req, res) => {
    try {
        const user = await findUserAndAuthorize(req.body)
        if (!user) return res.status(404).send("Користувача не знайдено")

        const token = assignToken(user.id, user.role)
        return res.status(201).json({message: "Авторизація успішна", accessToken: token})
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

userRouter.patch('/', getUserValidator, async (req, res) => {
    const {userId, username, role} = req.body
    try {
        if (!userId || !username || !role) return res.status(400).send("Вкажіть всі поля")
        const roleId = await getRoleId(role)

        const updatedUser = await updateUser(userId, username, roleId)
        if (updatedUser.affected === 0) return res.status(404).send("Сталася помилка")

        return res.status(200).json("Користувача успішно оновлено")
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

userRouter.delete('/nurse', getUserValidator, async (req, res) => {
    try {
        await removeUserById(req.body.id)
        return res.status(200).json("Успішно видалено")
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

module.exports = userRouter;
