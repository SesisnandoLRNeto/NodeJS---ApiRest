const router = require('express').Router()
const Materials = require('./Materials')
const TableMaterials = require('./TableMaterial')
const NotFound = require('../../errors/NotFound')

const SerializerMaterial = require('../../api/Serializer').SerializerMaterial

router.get('/', async (req, res) => {
    const resource = await TableMaterials.listAll()
   
    res.status(200)
    const serializerHeader = new SerializerMaterial(
        res.getHeader('Content-Type')
    )
    res.send(
        // JSON.stringify(resource)
        serializerHeader.serializer(resource)
    )
})

router.post('/', async (req, res, next) => {
    try {   
        const materialPOSTED = req.body
        const materialCreated = new Materials(materialPOSTED)
        
        await materialCreated.create()
        res.status(201)
        const serializerHeader = new SerializerMaterial(
            res.getHeader('Content-Type')
        )
        res.send(
            // JSON.stringify(materialCreated)
            serializerHeader.serializer(materialCreated)
        )
    }
    catch(error) {
       next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const id = req.params.id
        const material = new Materials({ id: id })

        await material.searchRegister()
        
        res.status(200)
        const serializerHeader = new SerializerMaterial(
            res.getHeader('Content-Type'),
            ['date_created', 'date_updated', 'version']
        )
        res.send(
            // JSON.stringify(material)
            serializerHeader.serializer(material)
        )
    } 
    catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const datas = req.body

        const datasUpdated = Object.assign({}, datas, { id: id })
        const materialUpdated = new Materials(datasUpdated)
        await materialUpdated.updatedRegister()

        res
            .status(204)
            .end()
    } 
    catch (error) {
        next(error)
    }
    
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        materialDeleted = new Materials({ id: id })
        await materialDeleted.searchRegister()
        await materialDeleted.deleteRegister()
        res
            .status(204)
            .end()
    }
    catch(error) {
        next(error)
    }
})

module.exports = router