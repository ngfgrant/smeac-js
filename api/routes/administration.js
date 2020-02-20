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
    result = { error: error.name, message: error.message };
    res.status(400).json(result);
  }
});

router.get("/", async (req, res, next) => {
  const adminList = Admin.find((err, items) => {
    if (err) {
      res.status(400).send({ err });
    }
    res.status(201).send({ items });
  });
});

router.delete("/", async (req, res, next) => {
  const id = req.query.id;
  try {
    result = await Admin.remove({ _id: id });
    res.status(201).send(result);
  } catch (error) {
    result = { error: error.name, message: error.message };
    res.status(401).send(result);
  }
});

module.exports = router;
