const {getUserValidator} = require("../user/userValidators");
const {getRoles} = require("./roleFunctions");
const roleRouter = require("express").Router()


roleRouter.get("/", getUserValidator, async (req, res) => {
    try {
        const roles = await getRoles(req.roleId)
        return res.status(200).json(roles)
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

module.exports = roleRouter
