/**
*@title express
*@date 2021-12-03
*@author 홍수희
*@desc 서버 실행 모듈
*@etc(change)
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extends:true}));
app.use(cors());
app.use(bodyParser.json());

const port =process.env.PORT || 3505;

const server = app.listen(port,function(){
    console.log("Express server has started on port "+port);
})

module.exports = app;
