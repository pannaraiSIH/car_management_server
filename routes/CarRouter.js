const express = require("express");
const { getCars } = require("../controllers/CarController");
const router = express.Router();

router.get("/", getCars);

module.exports = router;
