class ValueNotSupport extends Error {
    constructor(contentType) {
        super(`The value of content aren't support: ${contentType}`)
        this.name = 'ValueNotSupport'
        this.errorId = 3
    }
}
module.exports = ValueNotSupport