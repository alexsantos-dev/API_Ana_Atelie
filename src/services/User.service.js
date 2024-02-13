import User from '../models/User.model.js'
import bcrypt from 'bcrypt'

async function createUser(name, email, password, cep) {
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashPassword, cep })
        return user
    }
    catch (error) {
        console.log(error)
    }
}

async function findAllUsers() {
    try {
        const users = await User.findAll()
        return users
    }
    catch (error) {
        console.log(error)
    }
}

async function findOneUser(id) {
    try {
        const user = await User.findAll({
            where: {
                id: id
            }
        })
        return user
    }
    catch (error) {
        console.log(error)
    }
}

export default {
    createUser,
    findAllUsers,
    findOneUser
}