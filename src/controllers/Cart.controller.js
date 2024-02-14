import CartService from '../services/Cart.service.js'
import ProductService from '../services/Product.service.js'
import UserService from '../services/User.service.js'

async function addCartItem(req, res) {
    const { userId, productId, quantity } = req.body

    const checkProductId = await ProductService.findOneProduct(productId)
    const checkUserId = await UserService.findOneUser(userId)

    if (!checkProductId || !checkUserId) {
        return res.status(404).json({ error: 'Produto ou usuário não encontrado!' })
    }

    if (userId && productId && quantity) {
        const cartItem = await CartService.addCartItem(userId, productId, quantity)
        res.status(200).json(cartItem)
    } else {
        res.status(409).json({ error: 'Envie todos os campos!' })
    }
}

async function findCartItensByUser(req, res) {
    const { userId } = req.params

    const checkUserId = await UserService.findOneUser(userId)

    if (!checkUserId) {
        return res.status(404).json({ error: 'Usuário não encontrado!' })
    }

    if (userId) {
        const cartItens = await CartService.findCartItensByUser(userId)
        if (cartItens.length > 0) {
            res.status(200).json({ CartItens: cartItens })
        }
        else {
            res.status(404).json({ error: 'Nenhum produto encontrado para este usuário!' })
        }
    }
}

async function deleteItemCart(req, res) {
    const { id } = req.params

    const checkCartItemId = await CartService.findCartItemById(id)

    if (!checkCartItemId) {
        return res.status(404).json({ error: 'Nenhum item encontrado!' })
    }

    if (id) {
        const itemCart = await CartService.deleteItemCart(id)
        if (itemCart) {
            res.status(200).json({ message: 'Item deletado com êxito!' })
        }
        else {
            res.status(409).json({ error: 'Erro ao deletar item!' })
        }
    }
}

export default {
    addCartItem,
    findCartItensByUser,
    deleteItemCart
}