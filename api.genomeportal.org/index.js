/**
 *@title express
 *@date 2021-12-03
 *@author 홍수희
 *@desc 서버 실행 모듈
 *@etc(change)
 * ( 2022-03-17 ) express-rate-limit 모듈 추가
 */
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit"); // DoS 방어용
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extends: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1분간
    max: 100, //최대 100번
    message: "Too many requests, please try again later.",
  })
);

const port = process.env.PORT || 3505;

const server = app.listen(port, function () {
  console.log("Express server has started on port " + port);
});

module.exports = app;
