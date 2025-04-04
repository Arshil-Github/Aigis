const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const mapRouter = require("./maps");
const socialRouter = require("./community");

const router = express.Router();

router.use("/maps", mapRouter);
router.use("/social", socialRouter);

router.use(bodyParser.json());
router.use(cors());

//router.use("/auth", authRouter);

module.exports = router;
