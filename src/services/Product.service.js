import Product from '../models/Product.model.js'

async function createProduct(name, mark, category, price, stock, image) {
    await Product.sync()
    const product = await Product.create({ name, mark, category, price, stock, image })
    return product

}

async function findAllProducts() {

    const products = await Product.findAll()
    return products

}

async function findOneProduct(id) {
    const product = await Product.findByPk(id)
    return product
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
    updateProduct,
    deleteProduct
}