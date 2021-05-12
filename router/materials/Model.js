const Sequelize = require('sequelize')
const sequelize = require('../../db')

const columns = {
    material: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('vidro', 'ferro', 'aluminio'),
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
}
const options = {
    freezeName: true,
    tableName: 'materials',
    timestamps: true,
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    version: 'version'
}

module.exports = sequelize.define('material', columns, options)
