const httpStatusObj = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    getStatusMessage: function(statusCode){
        const mes = {
            200: "OK.",
            400: "data not correct or find not todo!",
            404: "not found.",
            500: "Internal Server Error."
        }
        return mes[statusCode];
    }
}

module.exports = httpStatusObj;