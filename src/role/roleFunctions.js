const AppDataSource = require("../../ormconfig")
const roleEntity = require("./roleEntity")

const roleRepository = AppDataSource.getRepository(roleEntity)

const tabs = [
    {id: 1, name: "Користувачі", canEdit: [1, 2], show: [1, 2]},
    {id: 2, name: "Прийоми", canEdit: [2, 3], show: [2, 3]},
    {id: 3, name: "Пацієнти", canEdit: [2, 3], show: [2, 3]},
    {id: 4, name: "Пацієнт", canEdit: [2, 3], show: []},
    // {id: 5, name: "Бухгалтерія", canEdit: [2, 3], show: [1, 2, 3]},
];

const getRoleId = async (name) => {
    return await roleRepository.findOneBy({name})
}

const getRoleName = async (roleId) => {
    const role = await roleRepository.findOneBy({id: roleId})
    return role?.name || 'N/A'
}

const getTabsByRoleId = async (roleId) => {
    return tabs
        .filter(tab => tab.show.includes(roleId))
        .map(tab => ({
            id: tab.id,
            name: tab.name,
            canEdit: tab.canEdit.includes(roleId)
        }));
}

const getRoles = async (roleId) => {
    let roles
    switch (roleId) {
        case 1:
            roles = await roleRepository.find()
            break
        case 2:
            roles = await roleRepository.findBy({id: 3})
            break
        default:
            throw new CustomError("Відмовлено в доступі", 403)
    }
    return roles || []
}

module.exports = {
    getRoleId,
    getRoleName,
    getTabsByRoleId,
    getRoles
}
