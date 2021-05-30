const Sequelize = require('sequelize')
const connection = require('../../db')

const columns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cellPhone: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}
const options = {
    freezeName: true,
    tableName: 'providers',
    timestamps: true,
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    version: 'version'
}

module.exports = connection.define('provider', columns, options)
