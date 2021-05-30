const TableProvider = require('./DAO')
const InvalidField = require('../../errors/InvalidField')
const DataIsEmpty = require('../../errors/DatasIsEmpty')

class Providers {
    constructor({
        id,
        name,
        description,
        cellPhone,
        address,
        date_created,
        date_updated,
        version
    }) { 
        this.id = id
        this.name = name
        this.description = description
        this.cellPhone = cellPhone
        this.address = address
        this.date_created = date_created
        this.date_updated = date_updated
        this.version = version
    }

    async create () {
        this.valid()
        const result = await TableProvider.insert({
            name: this.name,
            description: this.description,
            quantity: this.quantity,
            type: this.type,
            address: this.price
        })

        this.id = result.id
        this.date_created = result.date_created
        this.date_updated = result.date_updated
        this.version = result.version        
    }

    async searchRegister () {
        const findProvider = await TableProvider.findById(this.id)
        
        this.name = findProvider.name
        this.description = findProvider.description
        this.address = findProvider.address
        this.cellPhone = findProvider.cellPhone
        this.date_created = findProvider.date_created
        this.date_updated = findProvider.date_updated
        this.version = findProvider.version
    }
    
    async updatedRegister() {
        await TableProvider.findById(this.id)

        const fields = [ 'name', 'description', 'cellPhone', 'address' ]
        const dataUpdated = {}

        fields.forEach(field => { 
            const value = this[field]

            if(typeof value === 'string' && value.length > 0){
                dataUpdated[field] = value
            }
        })

        if(Object.keys(dataUpdated).length === 0) throw new DataIsEmpty()
        await TableProvider.updateRegister(this.id, dataUpdated)
    }

    async deleteRegister() {
        return TableProvider.delete(this.id)
    }

    valid() {
        const fields = [ 'name', 'description', 'cellPhone', 'address' ]

        fields.forEach(field => {
            const value = this[field]

            if(typeof value !== 'string' || value.length === 0) {
                throw new InvalidField(field)
            }
        })
    }
}

module.exports = Providers