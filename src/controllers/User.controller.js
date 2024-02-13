import UserService from '../services/User.service.js'
import bcrypt from 'bcrypt'

async function createUser(req, res) {
    try {
        const { name, email, password, cep } = req.body

        if (name && email && password && cep) {
            const user = await UserService.createUser(name, email, password, cep)

            if (user) {
                res.status(200).json({ message: 'Usuário criado com sucesso!' })
            } else {
                res.status(400).json({ error: 'Erro ao criar usuário!' })
            }
        } else {
            res.status(409).json({ error: 'Envie todos os campos!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findAllUsers(req, res) {
    try {
        const users = await UserService.findAllUsers()
        if (users.length > 0) {
            res.status(200).json({ Users: users })
        } else {
            res.status(404).json({ error: 'Nenhum usuário encontrado' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findOneUser(req, res) {
    try {
        const { id } = req.params
        const user = await UserService.findOneUser(id)

        if (user) {
            res.status(200).json({ User: user })
        } else {
            res.status(404).json({ error: 'Nenhum usuário encontrado' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params
        const fields = req.body
        const userId = await UserService.findOneUser(id)

        if (fields.password) {
            fields.password = await bcrypt.hash(fields.password, 10)
        }

        if (!userId) {
            res.status(404).json({ error: 'Nenhum usuário encontrado' })
        }

        if (userId && Object.keys(fields).length > 0) {
            await UserService.updateUser(id, fields)
            res.status(200).json({ message: 'Usuário atuliazado com sucesso!' })
        }
        else {
            res.status(409).json({ error: 'Envie algum campo para atualizar usuário!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params
        const userId = await UserService.findOneUser(id)

        if (userId) {
            await UserService.deleteUser(id)
            res.status(202).json({ message: 'Usuário deletado com êxito!' })
        } else {
            res.status(404).json({ error: 'Nenhum usuário encontrado' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

export default {
    createUser,
    findAllUsers,
    findOneUser,
    updateUser,
    deleteUser
}