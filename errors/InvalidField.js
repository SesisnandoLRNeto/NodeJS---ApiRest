class InvalidField extends Error {
    constructor(field){
        const message = `The field ${field} isn't valid, because is empty`
        super(message)
        this.name = 'InvalidField'
        this.errorId = 1
    }
}
module.exports = InvalidField