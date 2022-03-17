/**
*@title server
*@date 2021-11-16
*@author 홍수희
*@desc 프론트에 데이터 전송용 서버
*@etc(change)
*/

const app = require('./index.js');
// const db = require('./DBconn.js'); //db 호출
const header = "Access-Control-Allow-Origin";

const routes = require('./routes/index.js');
app.use('/api',routes);


//
// /**
//  * 검색
//  */
// app.post('/api/search',async (req,res)=> {
//     const {keyword} = req.body;
//     let resList = new Array();
//
//     const geneRes = await db.collection('genelist').find().sort({GeneSymbol:1}).toArray();
//     const traitRes = await db.collection('trait').aggregate([{$group:{'_id':"$trait"}},{$sort:{'_id':1}}]).toArray();
//
//     for(let gene of geneRes){ resList.push(gene.GeneSymbol); }
//     for(let tr of traitRes){ resList.push(tr._id); }
//
//     if(keyword != null && keyword != ''){
//         let word = keyword.toLowerCase();
//         const result = resList.filter(el=>el.toLowerCase().includes(word));
//         res.send(result);
//         // console.log(result.length);
//     }else{
//         res.send(resList);
//     }
// });
//
//
// //db연결 test용 url에서 test_db로 변경후 실행
// app.post('/data/ass',(req,res)=>{
//     const {geneSymbol} = req.body;
//     console.log(geneSymbol);
//     db.collection('book').find({name:geneSymbol}).toArray((err,item)=>{
//         if(err) throw err;
//         res.send(item);
//     })
//
// })
//
// //검색창 자동완성에 띄울 genelist
// app.post('/api/genelist',(req,res)=>{
//     db.collection('genelist').find().sort({GeneSymbol:1}).toArray((err,item)=>{
//         if(err) throw err;
//         let genelist = new Array();
//         for(let i in item){
//             genelist.push({genesymbol:item[i].GeneSymbol});
//         }
//         res.send(genelist);
//     })
// })
//
// app.post('/genelist',(req,res)=>{
//     db.collection('genelist').find().sort({GeneSymbol:1}).toArray((err,item)=>{
//         if(err) throw err;
//         res.send(item);
//     })
// })
// /**
//  * trait만 가지고 오기
//  */
// app.post('/api/trait',(req,res)=>{
//     db.collection('trait').find().sort({trait:1}).toArray((err,item)=>{
//         if(err) throw err;
//         let result = new Array();
//
//         for(let i in item){
//             if(result.length > 0){
//                 let cnt = 0;
//                 for(let j in result){
//                     if(result[j].trait===item[i].trait){ cnt++;}
//                 }
//                 if(cnt == 0){
//                     result.push({trait:item[i].trait});
//                 }
//             }else{
//                 result.push({trait:item[i].trait});
//             }
//
//         }
//         res.send(result);
//     })
// })
//
// /**
//  * 주기적으로 확인하고 교체하는 함수 필요?
//  * 메인 화면에 gene, variant 개수 출력용
//  */
// app.post('/api/count',(req,res)=>{
//     db.collection('counts').find().toArray((err,item)=>{
//         if(err) throw err;
//         res.send(item);
//         // console.log(item);
//     })
// })
//
// //genesymbol 받으면 일치하는 variants 찾아서 전달
// app.post('/api/variants',(req,res)=>{
//     const {gene_symbol} = req.body;
//     // console.log("gene_symbol:",gene_symbol);
//     db.collection('variants').find({genesymbol:gene_symbol}).toArray((err,item)=>{
//         if(err) throw err;
//         res.send(item);
//     });
// });
//
// //variant id 받아서 variant 1개만 출력
// app.post('/api/variants/variant',(req,res)=>{
//     const {variant_id} = req.body;
//     db.collection('variants').find({variantid:variant_id}).toArray((err,item)=>{
//         if(err) throw err;
//         res.header(header, "*");
//         res.send(item);
//     })
// })
//
// //variant id 받아서 일치하는 associations 출력하기
// app.post('/api/variants/associations',(req,res)=>{
//     const {variant_id} = req.body;
//     const tmp = variant_id.split('-');
//     const chr = tmp[0].replace('chr','');
//     const pos = tmp[1]
//     db.collection('associations').find({clumpedchr:chr,clumpedpos:pos}).toArray((err,result)=>{
//         if(err) throw err;
//         res.header(header, "*");
//         res.send(result);
//     })
//
// })
// /**
//  * 전달받은 trait와 일치하는 variant id들 가지고 오기
//  */
// app.post('/api/variants/trait',(req,res)=>{
//     const {trait_name} = req.body;
//     db.collection('trait').aggregate([
//         {
//             $match:{"trait":trait_name}
//         },
//         {
//             $lookup:{from:"variants",localField:"variantid",foreignField:"variantid",as:"_variant"}
//         }
//         ]).toArray((err,result)=>{
//             if(err) throw err;
//             let variants = new Array();
//             for(i in result){
//                 variants.push(result[i]._variant);
//             }
//             // console.log(variants);
//             res.send(variants);
//     })
//
// })
//
