const http = require('http');
const todoListRouter = require('./routes/todoList');
const errorHandler = require('./errorHandler/errorHandler');
const httpStatusObj = require('./base/httpStatus');

const PORT = require('./base/baseSet').PORT;
const server = http.createServer((req,res)=>{
    const url = req.url;
    if(url ==='/todos' || url.startsWith('/todos/')){
        todoListRouter(req,res);
    }else {
        errorHandler(res,httpStatusObj.NOT_FOUND);
    }

});

server.listen(process.env.PORT || PORT , ()=>{
    console.log(`server listen on port: ${PORT}`);
});