const logger = require('../config/winston.js');
const requestIP = require('request-ip');
const db = require('../DBconn.js');
const express = require('express');
const route = express.Router();

/**
 * 전달받은 trait와 일치하는 variant id들 가지고 오기
 */
route.post('/',(req,res)=>{
    try{
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
    }catch(e){
        logger.error('(traits.js) POST / '+e);
        res.send('-1');
    }
});

module.exports = route;