const logger = require("../config/winston.js");
const db = require("../DBconn.js");
const express = require("express");
const route = express.Router();
const requestIP = require("request-ip");

/**
 * variants genes 개수 출력
 */
route.post("/count", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    // logger.info(`(data.js) request POST /count (ip${ip})`)
    db.collection("counts")
      .find()
      .toArray((err, item) => {
        if (err) {
          logger.error(err);
          res.send("-1");
        } else {
          res.send(item);
        }
      });
  } catch (e) {
    logger.error("(data.js) POST /count " + e);
    res.sned("-1");
  }
});

/**
 * 검색창 자동완성에 출력할 리스트
 */
route.post("/search", async (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    // logger.info(`(data.js) request POST /search (ip${ip})`)
    const { keyword } = req.body;
    let resList = new Array();

    const geneRes = await db
      .collection("genelist")
      .find()
      .sort({ GeneSymbol: 1 })
      .toArray(); //db에서 genelist 불러오기
    const traitRes = await db
      .collection("trait")
      .aggregate([{ $group: { _id: "$trait" } }, { $sort: { _id: 1 } }])
      .toArray(); //db에서 trait 불러오기

    for (let gene of geneRes) {
      resList.push(gene.GeneSymbol);
    } //배열에 값 담기
    for (let tr of traitRes) {
      resList.push(tr._id);
    } //배열에 값 담기

    if (keyword != null && keyword != "") {
      //입력받은 키워드가 있다면
      let word = keyword.toLowerCase();
      const result = resList.filter((el) => el.toLowerCase().includes(word)); //키워드가 포함된 아이템만 리스트에 담기
      res.send(result);
      // console.log(result.length);
    } else {
      //없다면 전체 리스트 리턴
      res.send(resList);
    }
  } catch (e) {
    logger.error("(data.js) POST /search " + e);
    res.send("-1");
  }
});

/**
 * 사용자가 클릭한 아이템이 trait인지 아닌지 판별
 */
route.post("/trait", async (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    logger.info(`(data.js) request POST /trait (ip${ip})`);
    const { trait } = req.body;
    const traitRes = await db
      .collection("trait")
      .aggregate([{ $group: { _id: "$trait" } }, { $sort: { _id: 1 } }])
      .toArray();
    var cnt = 0;
    for (var t of traitRes) {
      if (trait == t._id) {
        cnt++;
        res.send(true);
        break;
      }
    }
    if (cnt === 0) {
      res.send(false);
    }
  } catch (e) {
    logger.error("(data.js) POST /trait " + e);
    res.send("-1");
  }
});

module.exports = route;
