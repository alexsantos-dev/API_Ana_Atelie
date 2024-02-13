import User from '../models/User.model.js'
import bcrypt from 'bcrypt'

async function createUser(name, email, password, cep) {
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashPassword, cep })
        return user
    }
    catch (error) {
        console.error(error)
    }
}

async function findAllUsers() {
    try {
        const users = await User.findAll()
        return users
    }
    catch (error) {
        console.error(error)
    }
}

async function findOneUser(id) {
    try {
        const user = await User.findByPk(id)
        return user
    }
    catch (error) {
        console.error(error)
    }
}

async function updateUser(id, fields) {
    try {
        await User.update(fields, {
            where: {
                id: id
            }
        })
    }
    catch (error) {
        console.error(error)
    }
}

async function deleteUser(id) {
    try {
        return await User.destroy({
            where: {
                id: id
            }
        })
    }
    catch (error) {
        console.error(error)
    }
}

export default {
    createUser,
    findAllUsers,
    findOneUser,
    updateUser,
    deleteUser
}