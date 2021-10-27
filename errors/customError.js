class CustomError extends Error{
    constructor({code, message}) {
        super();
        this.status = code
        this.message=message
    }
}
module.exports = CustomError