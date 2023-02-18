const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("You shouldn't be here, Dave.");
});

module.exports = router;
