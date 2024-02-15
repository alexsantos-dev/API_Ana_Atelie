import User from '../models/User.model.js'
import bcrypt from 'bcrypt'

async function createUser(name, email, birthDate, cep, password) {

    await User.sync()
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, birthDate, cep, password: hashPassword })
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
    const user = await User.update(fields, {
        where: {
            id: id
        }
    })
    return user

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