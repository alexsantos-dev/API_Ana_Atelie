import UserService from '../services/User.service.js'

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
            res.status(409).json('Envie todos os campos!')
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

export default {
    createUser,
    findAllUsers,
    findOneUser
}