/**
 *@title count collection에 값 넣기
 *@date 2022-03-15
 *@author 홍수희
 *@desc count() 쿼리를 사용하면 너무 느려서 각 컬렉션의 개수를 `count` 에 넣고 사용하기로 함
 * 해당 코드는 count 컬렉션에 값 넣는 코드
 *@etc(change)
 */

const mongoose = require("mongoose"); //mongoose 모듈
const URL = "mongodb://localhost:27017/koreanGenomePortal"; //mongoDB 위치
mongoose.connect(URL);
const db = mongoose.connection;
db.on("error", function () {
  console.log("MongoDB Connection Failed!");
});
db.once("open", function () {
  console.log("MongoDB Connected!");
});

main();

async function main() {
  const count = new Array();
  const v = await db.collection("variants").count();
  count.push({ variant: v });
  const g = await db.collection("genelist").count();
  count.push({ genelist: g });
  const a = await db.collection("associations").count();
  count.push({ associations: a });
  console.log(count);
  db.collection("test").insertMany(count, (err, res) => {
    //데이터 insert
    if (err) throw err; //error 발생시
    console.log(`${res.insertedCount} documents were inserted`); //insert 성공시 콘솔 출력
    db.close(); //db close
  });
}
