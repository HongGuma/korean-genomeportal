const db = require('../DBconn.js');
const express = require('express');
const route = express.Router();

/**
 * 전달받은 trait와 일치하는 variant id들 가지고 오기
 */
route.post('/',(req,res)=>{
    const {trait_name} = req.body;
    db.collection('trait').aggregate([
        {
            $match:{"trait":trait_name}
        },
        {
            $lookup:{from:"variants",localField:"variantid",foreignField:"variantid",as:"_variant"}
        }
    ]).toArray((err,result)=>{
        if(err) throw err;
        let variants = new Array();
        for(i in result){
            variants.push(result[i]._variant);
        }
        // console.log(variants);
        res.send(variants);
    })

});

module.exports = route;