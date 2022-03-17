const db =require('../DBconn.js');
const express = require('express');
const route = express.Router();

/**
 * variants genes 개수 출력
 */
route.post('/count',(req,res)=>{
    db.collection('counts').find().toArray((err,item)=>{
        if(err) throw err;
        res.send(item);
        // console.log(item);
    })
})

/**
 * 검색창 자동완성에 출력할 리스트
 */
route.post('/search',async (req,res)=> {
    const {keyword} = req.body;
    let resList = new Array();

    const geneRes = await db.collection('genelist').find().sort({GeneSymbol:1}).toArray();
    const traitRes = await db.collection('trait').aggregate([{$group:{'_id':"$trait"}},{$sort:{'_id':1}}]).toArray();

    for(let gene of geneRes){ resList.push(gene.GeneSymbol); }
    for(let tr of traitRes){ resList.push(tr._id); }

    if(keyword != null && keyword != ''){
        let word = keyword.toLowerCase();
        const result = resList.filter(el=>el.toLowerCase().includes(word));
        res.send(result);
        // console.log(result.length);
    }else{
        res.send(resList);
    }
});

/**
 * 사용자가 클릭한 아이템이 trait인지 아닌지 판별
 */
route.post('/trait',async (req,res)=>{
    const {trait} = req.body;
    const traitRes = await db.collection('trait').aggregate([{$group:{'_id':"$trait"}},{$sort:{'_id':1}}]).toArray();
    var cnt = 0;
    for(var t of traitRes){
        if(trait == t._id){
            cnt++;
            res.send(true);
            break;
        }
    }
    if(cnt === 0){
        res.send(false);
    }

})

module.exports = route;
