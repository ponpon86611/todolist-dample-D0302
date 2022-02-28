const headers = require('../base/baseSet').headers;
const httpStatusObj = require('../base/httpStatus');

function errorHandler(res,status) {
    res.writeHead(status,headers);
    res.write(JSON.stringify({
        "status": status,
        "message": httpStatusObj.getStatusMessage(status)
    }));
    res.end();
}

module.exports = errorHandler;