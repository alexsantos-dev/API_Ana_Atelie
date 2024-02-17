import { Sequelize } from 'sequelize'
import Product from '../models/Product.model.js'

async function createProduct(name, mark, category, price, stock, image) {
    await Product.sync()
    const product = await Product.create({ name, mark, category, price, stock, image })
    return product

}

async function findAllProducts() {

    const products = await Product.findAll({
        order: [['updatedAt', 'desc']]
    })
    return products

}

async function findOneProduct(id) {
    const product = await Product.findByPk(id)
    return product
}

async function findProductsByKeyword(key) {
    const keywords = key.split(' ')
    const normalizedKeywords = keywords.map(keyword => keyword.toLowerCase())

    const products = await Product.findAll({
        where: {
            [Sequelize.Op.or]: normalizedKeywords.map(keyword => ({
                name: {
                    [Sequelize.Op.like]: `%${keyword}%`
                }
            }))
        },
        order: [['updatedAt', 'DESC']]
    })
    return products
}


async function findProductsByCategory(category) {

    const products = await Product.findAll({
        where: {
            category: category
        },
        order: [['updatedAt', 'desc']]
    })
    return products
}

async function findProductsByPrice(price) {

    const products = await Product.findAll({
        order: [['updatedAt', 'desc']]
    })
    return products.filter(product => product.price <= price)
}


async function updateProduct(id, fields) {

    await Product.update(fields, {
        where: {
            id: id
        }
    })

}

async function deleteProduct(id) {

    return await Product.destroy({
        where: {
            id: id
        }
    })

}

export default {
    createProduct,
    findAllProducts,
    findOneProduct,
    findProductsByKeyword,
    findProductsByCategory,
    findProductsByPrice,
    updateProduct,
    deleteProduct
}