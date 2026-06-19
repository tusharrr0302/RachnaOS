const express = require("express");
const router = express.Router();
const { simulate, getHistory } = require("./controller");
const { authenticate: requireAuth } = require("../../middleware/authenticate");

router.post("/simulate", requireAuth, simulate);
router.get("/history", requireAuth, getHistory);

module.exports = router;
