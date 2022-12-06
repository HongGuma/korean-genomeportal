/**
 *@title server
 *@date 2021-11-16
 *@author 홍수희
 *@desc 프론트에 데이터 전송용 서버
 *@etc(change)
 */

const app = require("./index.js");
// const db = require('./DBconn.js'); //db 호출
const header = "Access-Control-Allow-Origin";

const routes = require("./routes/index.js");
app.use("/api", routes);
