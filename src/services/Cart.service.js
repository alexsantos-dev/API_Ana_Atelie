import Cart from '../models/Cart.model.js'

await Cart.sync()

async function addCartItem(userId, productId, quantity) {
    const cartItem = await Cart.create({ userId, productId, quantity })
    return cartItem
}

async function findCartItensByUser(userId) {
    const cartItens = await Cart.findAll({
        where: {
            userId: userId
        }
    })
    return cartItens
}

async function findCartItemById(id) {
    const cartItem = await Cart.findByPk(id)
    return cartItem
}

async function deleteItemCart(id) {
    const itemCart = await Cart.destroy({
        where: {
            id: id
        }
    })
    return itemCart
}

export default {
    addCartItem,
    findCartItensByUser,
    findCartItemById,
    deleteItemCart
}