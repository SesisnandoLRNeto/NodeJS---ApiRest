const Sequelize = require('sequelize')
const config = require('config')

const sequelize = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.user'),
    config.get('mysql.pass'),
    {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }    
)

module.exports = sequelize