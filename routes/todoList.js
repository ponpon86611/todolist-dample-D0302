const {v4: uuidv4} = require('uuid');
const headers = require('../base/baseSet').headers;
const httpStatus = require('../base/httpStatus');
const errorHandler = require('../errorHandler/errorHandler');
const todoList = [];

function todoListRouter(req,res) {
    const method = req.method;
    let body = '';
    req.on('data', chunk=>{
        body += chunk;
    });

    if(method === 'GET') {
        res.writeHead(httpStatus.OK,headers);
        res.write(JSON.stringify({
            "status": httpStatus.getStatusMessage(httpStatus.OK),
            "data": todoList
        }));
        res.end();
    } else if(method === 'POST') {
        req.on('end',()=>{
            try {
                const title = JSON.parse(body).title;
                if(title !== undefined) {
                    const todo = {
                        title: title,
                        id: uuidv4()
                    }
                    todoList.push(todo);
                    res.writeHead(httpStatus.OK,headers);
                    res.write(JSON.stringify({
                        "status":httpStatus.getStatusMessage(httpStatus.OK),
                        "data":todoList
                    }));
                    res.end();
                }else {
                    // error
                    errorHandler(res,httpStatus.BAD_REQUEST);
                }
            } catch(error) {
                errorHandler(res,httpStatus.BAD_REQUEST);
            }
            
        });     
    } else if(method === 'DELETE') {
        const urlArr = req.url.split('/');
        if( urlArr.length > 3) {
            // 代表 url 路徑是不正確的 ， 如 localhost:3000/todos/abc/4dc82945-bfb6-4586-8acf-841d88ba3d2
            errorHandler(res,httpStatus.NOT_FOUND);
            return;
        }
        const todoSingle = req.url.indexOf('/todos/') !== -1 ? true:false;
        if(!todoSingle) {
            //刪除全部
            todoList.length = 0;
            res.writeHead(httpStatus.OK,headers);
            res.write(JSON.stringify({
                "status": httpStatus.getStatusMessage(httpStatus.OK),
                "data": todoList
            }));
            res.end();
        }else if(todoSingle) {
            //刪除單筆
            const id = req.url.split('/').pop();
            const index = todoList.findIndex(element => element.id === id);
            if(index !== -1) {
                todoList.splice(index,1);
                res.writeHead(httpStatus.OK,headers);
                res.write(JSON.stringify({
                    "status": httpStatus.getStatusMessage(httpStatus.OK),
                    "data": todoList
                }));
                res.end();
            }else {
                // no exist
                errorHandler(res,httpStatus.NOT_FOUND);
            }
        }
    } else if(method === 'PATCH') {
        try {
            req.on('end',()=>{
                try{
                    const title = JSON.parse(body).title;
                    if(title !== undefined){ // title不為undefined才繼續往下做

                        const urlArrLength = req.url.split('/').length;
                        if(urlArrLength === 3){ //正確的路徑 EX: /todos/uuid
                            const id = req.url.split('/').pop();
                            const index = todoList.findIndex(element => element.id === id);
                            if(index !== -1){
                                todoList[index].title = title;
                                res.writeHead(httpStatus.OK,headers);
                                res.write(JSON.stringify({
                                    "status": httpStatus.getStatusMessage(httpStatus.OK),
                                    "data" : todoList
                                }));
                                res.end();
                            }else {
                                errorHandler(res,httpStatus.BAD_REQUEST);
                            }

                        }else if(urlArrLength > 3 || urlArrLength < 3) { // 避免錯誤的路徑依舊能修改  EX:  /todos/abc/uuid  or  /todos 
                            errorHandler(res,httpStatus.BAD_REQUEST);
                        }
                        
                    }else{ 
                        errorHandler(res,httpStatus.BAD_REQUEST);
                    }
                    
                }catch{
                    errorHandler(res,httpStatus.BAD_REQUEST);
                }
                
            })
            
        }catch {
            errorHandler(res,httpStatus.BAD_REQUEST);
        }

    } else if(method === 'OPTIONS') {
        res.writeHead(httpStatus.OK,headers);
        res.end();
    } else {
        // error 其他請求方式
        errorHandler(res);
    }
}

module.exports = todoListRouter;