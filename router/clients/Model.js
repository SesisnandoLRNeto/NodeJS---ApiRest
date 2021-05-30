const Sequelize  = require('sequelize')
const connection = require('../../db')

const columns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cellPhone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    gender: {
        type: Sequelize.ENUM('M', 'F'),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('PENDING', 'NOPENDING', 'NEW'),
        allowNull: false
    },
    material_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../materials/Model'),
            key: 'id'
        }
    }
}

const options = {
    freezeName: true,
    tableName: 'clients',
    timestamps: true,
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    version: 'version'
}

module.exports = connection.define('client', columns, options)