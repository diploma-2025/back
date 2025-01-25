const {getAdminValidator} = require("../user/userValidators");
const {getAllRoles} = require("./roleFunctions");
const roleRouter = require("express").Router()

roleRouter.get("/", getAdminValidator, async (req, res) => {
    try {
        const roles = await getAllRoles()
        return res.status(200).json(roles)
    } catch (e) {
        return res.status(e.statusCode || 500).json({error: e.message})
    }
})

module.exports = roleRouter