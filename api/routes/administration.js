var express = require("express");
var router = express.Router();
var Admin = require("../models/administration");

router.post("/", async (req, res, next) => {
  let data = req.body;
  try {
    const admin = new Admin(data);
    await admin.save();
    res.status(201).send({ admin });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
