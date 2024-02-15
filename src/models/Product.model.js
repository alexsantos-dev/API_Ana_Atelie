import { DataTypes } from 'sequelize'
import sequelize from '../database/database.config.js'

const Product = sequelize.define('Products', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [2, 50],
            is: /^[a-zA-Z0-9\s]*$/
        }
    },
    mark: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50],
            is: /^[a-zA-Z0-9\s]*$/
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50],
            is: /^[a-zA-Z0-9\s]*$/
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isUrl: true
        }
    }
},
    {
        freezeTableName: true
    })

export default Product