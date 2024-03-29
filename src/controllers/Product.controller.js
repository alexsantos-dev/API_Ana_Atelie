import ProductService from '../services/Product.service.js'

async function createProduct(req, res) {
    try {
        const { name, mark, category, price, stock, image } = req.body

        if (name && mark && category && price && stock && image) {
            const product = await ProductService.createProduct(name, mark, category, price, stock, image)

            if (product) {
                res.status(200).json({ message: 'Produto criado com sucesso!' })
            } else {
                res.status(400).json({ error: 'Erro ao criar produto!' })
            }
        } else {
            res.status(409).json('Envie todos os campos!')
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findAllProducts(req, res) {
    try {
        const products = await ProductService.findAllProducts()
        if (products.length > 0) {
            res.status(200).json(products)
        } else {
            res.status(404).json({ error: 'Nenhum produto encontrado' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findOneProduct(req, res) {
    try {
        const { id } = req.params
        const product = await ProductService.findOneProduct(id)

        if (product) {
            res.status(200).json({ Product: product })
        } else {
            res.status(404).json({ error: 'Nenhum produto encontrado' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findProductsByKeyword(req, res) {
    try {
        const key = req.query.key
        const products = await ProductService.findProductsByKeyword(key)
        if (products.length > 0) {
            res.status(200).json(products)
        } else {
            res.status(404).json({ error: 'Nenhum produto encontrado' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findProductsByCategory(req, res) {
    try {
        const category = req.query.category
        const products = await ProductService.findProductsByCategory(category)
        if (products.length > 0) {
            res.status(200).json(products)
        } else {
            res.status(404).json({ error: 'Nenhum produto encontrado' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function findProductsByPrice(req, res) {
    try {
        const price = req.query.price
        const products = await ProductService.findProductsByPrice(price)
        if (products.length > 0) {
            res.status(200).json(products)
        } else {
            res.status(404).json({ error: 'Nenhum produto encontrado' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params
        const fields = req.body
        const productId = await ProductService.findOneProduct(id)

        if (!productId) {
            res.status(404).json({ error: 'Nenhum produto encontrado' })
        }

        if (productId && Object.keys(fields).length > 0) {
            await ProductService.updateProduct(id, fields)
            res.status(200).json({ message: 'produto atualizado com sucesso!' })
        }
        else {
            res.status(409).json({ error: 'Envie algum campo para atualizar produto!' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params
        const productId = await ProductService.findOneProduct(id)

        if (productId) {
            await ProductService.deleteProduct(id)
            res.status(202).json({ message: 'Produto deletado com êxito!' })
        } else {
            res.status(404).json({ error: 'Nenhum produto encontrado' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
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