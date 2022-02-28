const PORT = 3000;

const headers = {
    // 'Content-Type':'text/plain'
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
    'Content-Type': 'application/json'
}

module.exports.PORT = PORT;
module.exports.headers = headers;
