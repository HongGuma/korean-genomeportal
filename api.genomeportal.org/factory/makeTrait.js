/**
 *@title trait 생성 파일
 *@date 2022-03-15
 *@author 홍수희
 *@desc trait와 variants_id만 따로 뽑아서 db에 저장
 *@etc(change)
 */

const fs = require("fs");
const readline = require("readline");

let traits = new Array();
let associations = new Array();
let cnt = 0;

main();

function main() {
  const file1 = "./inputFile/Associated.txt"; //ass seq 파일
  const file2 = "./inputFile/Combined.AddNARD.FilterAC.txt"; //var seq 파일
  const file3 = "./output/make_trait.txt"; //만든 trait 파일
  fs.exists(file3, (exists) => {
    if (exists) {
      const tArr = openTrait(file3); // make_trait 파일 읽기
      mongo(tArr); // mongo db에 저장
    } else {
      const assArr = readAssociations(file1);
      readVariants(file2, assArr, file3);
    }
  });
}

/**
 * variant seq 파일 읽고 make_trait.txt 파일에 바로 쓰기,
 * 파일에 바로 쓰는 이유 readline가 비동기식 이라서
 * readline를 쓰는 이유 파일 크기가 너무 커서
 * @param fileName :variant data가 있는 file
 * @param associationsArr :trait와 association 정보가 있는 배열
 */
function readVariants(fileName, associationsArr, output) {
  console.time("time"); //시간 측정용
  process.stdout.write("["); //얼만큼 진행중인지 콘솔 확인용
  let stream_doc = fs.createReadStream(fileName); //스트림 단위로 파일 읽기
  let reader = readline.createInterface(stream_doc); //한줄씩 표준 입력 받기
  const arr = new Array();
  reader.on("line", function (data) {
    let token = data.split("\t"); //line 에서 한 항목씩 끊기
    let mkid = token[0] + "-" + token[1] + "-" + token[2] + "-" + token[3]; // Chr, Pos, Ref, Alt 추출후 variant id 생성
    for (var ass of associationsArr) {
      if (ass.chr == token[0] && ass.pos == token[1] && ass.alt == token[3]) {
        //association과 variant가 일치하는지
        var data = `${ass.trait}\t${mkid}\n`; //일치하면 trait와 variant id data 변수에 저장
        fs.appendFileSync(output, data);
        break; // 일치하는 variant 찾았으니까 for문이 더이상 돌아갈 필요 없음.
      }
    }
    cnt++;
    if (cnt % 50000 == 0) {
      //5만번에 한번씩 점 찍기
      process.stdout.write("="); // 콘솔 출력용
    }
  });

  reader.on("close", function () {
    //readline 끝난후
    console.log(" > done ]"); // 콘솔 출력용
    console.timeEnd("time"); // 시간 측정용
    const tArr = openTrait(); // make_trait 파일 읽기
    mongo(tArr); // mongo db에 저장
  });
}

/**
 * association 파일 읽어서 배열에 쓴 후 리턴
 * @param fileName :associate seq 파일
 * @returns {any[]} :associate 배열
 */
function readAssociations(fileName) {
  const assFile = fs.readFileSync(fileName, "utf-8");
  const line = assFile.split("\n");
  const arr = new Array();
  var txt = "trait\tchr\tpos\talt\n";
  for (var l of line) {
    const token = l.split("\t");
    if (token[0] == "Clumped_snp") continue;
    arr.push({
      trait: token[2],
      chr: `chr${token[4]}`,
      pos: token[5],
      alt: token[6],
    });
    txt += `${token[2]}\tchr${token[4]}\t${token[5]}\t${token[6]}\n`;
  }
  fs.writeFileSync("./output/ass_deg.txt", txt, "utf-8"); //디버깅용
  return arr;
}

/**
 * 추출한 데이터 mongo db에 저장
 * @param traitArr :trait 데이터가 담긴 배열
 */
function mongo(traitArr) {
  const mongoose = require("mongoose"); //mongoose 모듈
  const URL = "mongodb://localhost:27017/koreanGenomePortal"; //mongoDB 위치
  mongoose.connect(URL); //db 연결
  const db = mongoose.connection;
  db.on("error", function () {
    console.log("MongoDB Connection Failed!");
  }); // error
  db.once("open", function () {
    console.log("MongoDB Connected!");
  }); // 연결 성공
  db.collection("trait").insertMany(traitArr, (err, res) => {
    //데이터 insert
    if (err) throw err; //error 발생시
    console.log(`${res.insertedCount} documents were inserted`); //insert 성공시 콘솔 출력
    db.close(); //db close
  });
}

/**
 * make_trait에서 데이터 읽어서 배열에 저장하기
 * @returns {*} :trait 데이터가 담긴 배열
 */
function openTrait(fileName) {
  const trFile = fs.readFileSync(fileName, "utf-8"); //파일 읽기
  const trArr = trFile.toString().split("\n"); //한줄씩 읽기
  const arr = new Array();
  for (i in trArr) {
    let el = trArr[i].split("\t"); //한 항목씩 끊기
    arr.push({ trait: el[0], variantid: el[1] }); //arr에
  }
  return arr;
}
