import { DataTypes } from 'sequelize'
import sequelize from '../database/database.config.js'

const User = sequelize.define('Users', {
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
            is: /^[\u00C0-\u017Fa-zA-Z\s]*$/
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            is: /\d{4}-\d{2}-\d{2}/
        }
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9]{5}(?:-[0-9]{3})?$/
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        freezeTableName: true
    })
export default User