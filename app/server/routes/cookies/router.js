const express = require("express");

const router = express.Router();

router
  .get("/", require("./get"))
  .post("/", require("./post"))
  .post("/cookie-banner", require("./cookie-banner/post"));

module.exports = router;
