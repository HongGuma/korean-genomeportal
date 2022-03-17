/**
*@title mongodb 연결
*@date 2021-12-03
*@author 홍수희
*@desc db 연결하는 모듈
*@etc(change)
*/
const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/koreanGenomePortal";

mongoose.connect(URL);

const db = mongoose.connection;
db.on('error',function(){ console.log('MongoDB Connection Failed!'); })
db.once('open',function(){ console.log('MongoDB Connected!'); })

module.exports = db;