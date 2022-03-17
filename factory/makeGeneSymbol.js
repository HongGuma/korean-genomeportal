/**
*@title variant에서 geneSymbol만 꺼내는 코드
*@date 2022-03-15
*@author 홍수희
*@desc variant에서 find 써서 geneSymbol을 찾으면 시간이 오래걸리기 때문에 별도의 collection에 geneSymbol만 저장해서 사용하기로 함
*@etc(change)
*/


const fs = require('fs');

// main();

async function main(){
    const mongoose = require('mongoose'); //mongoose 모듈
    const URL = "mongodb://localhost:27017/koreanGenomePortal"; //mongoDB 위치
    mongoose.connect(URL);
    const db = mongoose.connection;
    db.on('error',function(){ console.log('MongoDB Connection Failed!'); })
    db.once('open',function(){ console.log('MongoDB Connected!'); })

    const arr = await db.collection('variants').distinct("genesymbol",(err,res)=>{ //중복없이 variants에서 gene symbol 가져오기
        if(err)throw err;
        else{
            const geneList = new Array();
            res.forEach((variant)=>{
                geneList.push({GeneSymbol:variant}) //배열에 불러온값 저장 
            })
            db.collection("genelist").insertMany(geneList,(err,res)=>{ //데이터 insert
                if(err)throw err; //error 발생시
                console.log(`${res.insertedCount} documents were inserted`); //insert 성공시 콘솔 출력
                db.close(); //db close
            })
        }
    });

}

