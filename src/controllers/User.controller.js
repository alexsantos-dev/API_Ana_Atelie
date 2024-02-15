import UserService from '../services/User.service.js'
import bcrypt from 'bcrypt'

async function createUser(req, res) {
    try {
        const { name, email, birthDate, cep, password } = req.body
        const isStrongPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/
        const dateFormat = /\d{4}-\d{2}-\d{2}/

        if (name && email && birthDate && cep && password) {

            if (isStrongPassword.test(password) && !(Object.values(req.body).some(value => value === "")) && (dateFormat.test(birthDate))) {
                const user = await UserService.createUser(name, email, birthDate, cep, password)

                if (user) {
                    res.status(200).json({ message: 'Usuário criado com sucesso!' })
                } else {
                    res.status(400).json({ error: 'Erro ao criar usuário!' })
                }
            }
            else if (!(dateFormat.test(birthDate))) {
                res.status(409).json({ error: 'Data inválida!' })
            }
            else {
                res.status(409).json({ error: 'A senha precisa ter pelo menos 8 caracteres, com no mínimo uma letra maiúscula, uma letra menúscula e um caractére especial' })
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
        const isStrongPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/
        const dateFormat = /\d{4}-\d{2}-\d{2}/

        if (fields.password) {
            if (isStrongPassword.test(fields.password)) {
                const comparePassword = await bcrypt.compare(fields.password, userId.dataValues.password)
                if (comparePassword) {
                    return res.status(409).json({ error: 'Sua senha não pode ser igual à anterior!' })
                } else {
                    fields.password = await bcrypt.hash(fields.password, 10)
                }
            }
            else {
                return res.status(409).json({ error: 'A senha precisa ter pelo menos 8 caracteres, com no mínimo uma letra maiúscula, uma letra minúscula e um caractére especial' })
            }
        }

        if (!userId) {
            return res.status(404).json({ error: 'Nenhum usuário encontrado' })
        }

        if (userId && (Object.keys(fields).length > 0) && !(Object.values(fields).some(value => value === "")) && (dateFormat.test(fields.birthDate))) {
            const update = await UserService.updateUser(id, fields)
            if (update) {
                res.status(200).json({ message: 'Usuário atualizado com sucesso!' })
            }
            else {
                res.status(409).json({ error: 'Erro ao atualizar usuário!' })
            }
        }
        else if (!(dateFormat.test(fields.birthDate))) {
            res.status(409).json({ error: 'Data inválida!' })
        }
        else {
            res.status(409).json({ error: 'Campos inválidos!' })
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