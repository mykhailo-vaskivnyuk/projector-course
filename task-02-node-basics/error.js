class HtmlResponseError extends Error {
    constructor (statusCode, message = "") {
        super(message)
        this.statusCode = statusCode;
    }
}

module.exports = { HtmlResponseError };
