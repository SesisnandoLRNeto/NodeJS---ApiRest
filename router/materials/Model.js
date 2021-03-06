const Sequelize = require('sequelize')
const connection = require('../../db')

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
        allowNull: false,
        defaultValue: 0
    },
    type: {
        type: Sequelize.ENUM('vidro', 'ferro', 'aluminio'),
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    // provider_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: require('../provider'),
    //         key: id
    //     }
    // }
}
const options = {
    freezeName: true,
    tableName: 'materials',
    timestamps: true,
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    version: 'version'
}

module.exports = connection.define('material', columns, options)
