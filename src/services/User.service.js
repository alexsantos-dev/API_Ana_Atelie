import User from '../models/User.model.js'
import bcrypt from 'bcrypt'

async function createUser(name, email, password, cep) {

    await User.sync()
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashPassword, cep })
    return user

}

async function findAllUsers() {

    await User.sync()
    const users = await User.findAll()
    return users


}

async function findOneUser(id) {
    await User.sync()
    const user = await User.findByPk(id)
    return user

}

async function updateUser(id, fields) {
    await User.sync()
    await User.update(fields, {
        where: {
            id: id
        }
    })

}

async function deleteUser(id) {

    return await User.destroy({
        where: {
            id: id
        }
    })

}

export default {
    createUser,
    findAllUsers,
    findOneUser,
    updateUser,
    deleteUser
}