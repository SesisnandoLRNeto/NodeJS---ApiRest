const router = require('express').Router()
const Materials = require('./Provider')
const TableProvider = require('./DAO')

const SerializerProvider = require('../../api/Serializer').SerializerProvider

router.get('/', async (req, res) => {
    const resource = await TableProvider.listAll()
   
    res.status(200)
    const serializerHeader = new SerializerProvider(
        res.getHeader('Content-Type')
    )
    res.send(
        // JSON.stringify(resource)
        serializerHeader.serializer(resource)
    )
})

router.post('/', async (req, res, next) => {
    try {   
        const providerPOSTED = req.body
        const providerCreated = new Materials(providerPOSTED)
        
        await providerCreated.create()
        res.status(201)
        const serializerHeader = new SerializerProvider(
            res.getHeader('Content-Type')
        )
        res.send(
            // JSON.stringify(providerCreated)
            serializerHeader.serializer(providerCreated)
        )
    }
    catch(error) {
       next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const id = req.params.id
        const provider = new Materials({ id: id })

        await provider.searchRegister()
        
        res.status(200)
        const serializerHeader = new SerializerProvider(
            res.getHeader('Content-Type'),
            ['date_created', 'date_updated', 'version']
        )
        res.send(
            // JSON.stringify(provider)
            serializerHeader.serializer(provider)
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
        const providerUpdated = new Materials(datasUpdated)
        await providerUpdated.updatedRegister()

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
        providerDeleted = new Materials({ id: id })
        await providerDeleted.searchRegister()
        await providerDeleted.deleteRegister()
        res
            .status(204)
            .end()
    }
    catch(error) {
        next(error)
    }
})

const routesMaterials = require('../materials')
router.use('/:id/materials', routesMaterials)

module.exports = router