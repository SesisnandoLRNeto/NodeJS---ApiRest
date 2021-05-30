const ModelProvider = require('./Model')
const NotFound = require('../../errors/NotFound')

module.exports = {
    listAll() {
        return ModelProvider.findAll({ raw: true }) //to catch raw datas of database
    },

    insert(material) {
        return ModelProvider.create(material)
    },

    async findById(id) {
        const findRegister = await ModelProvider.findOne({
            where: { id: id }
        })

        if(!findRegister) throw new NotFound()
        return findRegister
    },

    updateRegister(id, dataUpdated) {
        ModelProvider.update(dataUpdated, {
            where: { id: id }
        })
    },

    delete(id) {
        ModelProvider.destroy({
            where: { id: id }
        })
    }
}