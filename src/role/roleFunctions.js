const AppDataSource = require("../../ormconfig")
const roleEntity = require("./roleEntity")

const roleRepository = AppDataSource.getRepository(roleEntity)

const tabs = [
    {id: 1, name: "Користувачі", roleIds: [1]},
    {id: 2, name: "Прийоми", roleIds: [1, 2, 3]},
    {id: 3, name: "Пацієнти", roleIds: [1, 2,]},
];

const getRoleName = async (roleId) => {
    const role = await roleRepository.findOneBy({id: roleId})
    return role?.name || 'N/A'
}

const getTabsByRoleId = async (roleId) => {
    return tabs
        .filter((tab) => tab.roleIds.includes(roleId))
        .map(({id, name}) => ({id, name}))
}

const getAllRoles = async () => {
    const roles = await roleRepository.find()
    return roles || []
}

module.exports = {
    getRoleName,
    getTabsByRoleId,
    getAllRoles
}