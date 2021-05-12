class DataIsEmpty extends Error {
    constructor() {
        super('No body to update. Please inform the datas')
        this.name = 'DataIsEmpty'
        this.errorId = 2
    }
}
module.exports = DataIsEmpty