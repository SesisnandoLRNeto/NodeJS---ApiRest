class NotFound extends Error {
    constructor(){
        super('Error: Not found this register')
        this.name = 'NotFound'
        this.errorId = 0
    }
}
module.exports = NotFound