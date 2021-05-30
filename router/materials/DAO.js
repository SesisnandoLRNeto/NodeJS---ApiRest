const ModelMaterial = require('./Model')
const NotFound = require('../../errors/NotFound')

module.exports = {
    // listAllByProviderId(id) {
    //     return Model.findAll({
    //         where: {
    //             provider_id: id
    //         }
    //     })
    // },
    listAll() {
        return ModelMaterial.findAll({ raw: true }) //to catch raw datas of database
    },

    insert(material) {
        return ModelMaterial.create(material)
    },

    async findById(id) {
        const findRegister = await ModelMaterial.findOne({
            where: { id: id }
        })

        if(!findRegister) throw new NotFound()
        return findRegister
    },

    updateRegister(id, dataUpdated) {
        ModelMaterial.update(dataUpdated, {
            where: { id: id }
        })
    },

    delete(id) {
        ModelMaterial.destroy({
            where: { id: id }
        })
    }
}