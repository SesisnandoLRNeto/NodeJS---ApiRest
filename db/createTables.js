const ModelMaterials = require('../router/materials/Model')

ModelMaterials
    .sync()
    .then(() => console.log('Tables created'))
    .catch(erro => console.log('Erro: Failed has been created', erro))
