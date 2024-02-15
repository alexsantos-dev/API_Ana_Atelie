import { DataTypes } from 'sequelize'
import sequelize from '../database/database.config.js'
import User from "./User.model.js"
import Product from "./Product.model.js"

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        validate: {
            isUUID: true
        }
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        },
        validate: {
            isUUID: true
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    }
}, {
    freezeTableName: true
})

Cart.belongsTo(Product, { foreignKey: 'productId' })

export default Cart