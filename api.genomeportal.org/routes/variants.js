const logger = require("../config/winston.js");
const requestIP = require("request-ip");
const db = require("../DBconn.js");
const express = require("express");
const route = express.Router();
const header = "Access-Control-Allow-Origin";

/**
 * genesymbol과 일치하는 variants들만 전달
 */
route.post("/", (req, res) => {
  try {
    const { gene_symbol } = req.body;
    // console.log("gene_symbol:",gene_symbol);
    db.collection("variants")
      .find({ genesymbol: gene_symbol })
      .toArray((err, item) => {
        if (err) throw err;
        res.send(item);
      });
  } catch (e) {
    logger.error("(variants.js) POST / " + e);
    res.send("-1");
  }
});

/**
 * variant id 받아서 variant 1개만 출력
 */
route.post("/variant", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    logger.info(`(variants.js) request /variant (ip ${ip})`);
    const { variant_id } = req.body;
    db.collection("variants")
      .find({ variantid: variant_id })
      .toArray((err, item) => {
        if (err) throw err;
        res.header(header, "*");
        res.send(item);
      });
  } catch (e) {
    logger.error("(variants.js) POST /variant " + e);
    res.send("-1");
  }
});

/**
 * variant id 받아서 일치하는 associations 출력
 */
route.post("/associations", (req, res) => {
  try {
    const ip = requestIP.getClientIp(req);
    logger.info(`(variants.js) request /associations (ip ${ip})`);
    const { variant_id } = req.body;
    const tmp = variant_id.split("-");
    const chr = tmp[0].replace("chr", "");
    const pos = tmp[1];
    db.collection("associations")
      .find({ clumpedchr: chr, clumpedpos: pos })
      .toArray((err, result) => {
        if (err) throw err;
        res.header(header, "*");
        res.send(result);
      });
  } catch (e) {
    logger.error("(variants.js) POST /associations " + e);
    res.send("-1");
  }
});

module.exports = route;
