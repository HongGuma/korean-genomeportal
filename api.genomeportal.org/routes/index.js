const express = require("express");
const router = express.Router();

const variants = require("./variants.js");
const traits = require("./traits.js");
// const gene = require('./gene.js');
const data = require("./data.js");

// const traitSearch = require('./search.js');

// router.use('/variants/gene',gene);
router.use("/variants/traits", traits);
router.use("/variants", variants);
router.use("/data", data);

module.exports = router;
