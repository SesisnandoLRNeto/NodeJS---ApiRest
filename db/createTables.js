//To one table is okay
//const ModelMaterials = require('../router/materials/Model')
//
// ModelMaterials
//     .sync()
//     .then(() => console.log('Tables created'))
//     .catch(erro => console.log('Erro: Failed has been created', erro))

const models = [
    require('../router/clients/Model'), 
    require('../router/materials/Model')
]

async function createTables() {
    for(let count = 0; count < models.length; count ++) {
        const model = models[count]
        await model.sync()
    }
}

createTables()