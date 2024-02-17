import { Router } from 'express'
import UserController from '../controllers/User.controller.js'
import ProductController from '../controllers/Product.controller.js'
import CartController from '../controllers/Cart.controller.js'

const router = Router()

//USERS
router.post('/users', UserController.createUser)
router.get('/users', UserController.findAllUsers)
router.get('/users/:id', UserController.findOneUser)
router.patch('/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)

//PRODUCTS
router.post('/products', ProductController.createProduct)
router.get('/products', ProductController.findAllProducts)
router.get('/products_name', ProductController.findProductsByKeyword)
router.get('/products_category', ProductController.findProductsByCategory)
router.get('/products_price', ProductController.findProductsByPrice)
router.get('/products/:id', ProductController.findOneProduct)
router.patch('/products/:id', ProductController.updateProduct)
router.delete('/products/:id', ProductController.deleteProduct)

//CART
router.post('/cart', CartController.addCartItem)
router.get('/cart/:userId', CartController.findCartItensByUser)
router.delete('/cart/:id', CartController.deleteItemCart)
export default { router }