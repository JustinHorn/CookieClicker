var express = require("express");
const userModel = require("../models/data");
var router = express.Router();

const values = { test: 10 };

/* GET users listing. */
router.post("/get", async function (req, res, next) {
  if (req.body.name) {
    const name = req.body.name;
    const user = await userModel.findOne({ name: name }).cursor().next();
    if (user) {
      try {
        res.json({ user, success: true });
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.json({ message: "name not found", success: false });
    }
  } else {
    res.json({ message: "no name in request", success: false });
    res.end();
  }
});

router.post("/create", async function (req, res, next) {
  if (req.body.name && req.body.clicks) {
    const name = req.body.name;
    const clicks = req.body.clicks;
    const user = await userModel.findOne({ name: name }).cursor().next();

    if (user) {
      res.json({ message: "Name already exists in values", success: false });
    } else {
      const user = await new userModel({ name, clicks });
      try {
        await user.save();
        res.json({ message: "Name added", success: true });
      } catch (err) {
        res.status(500).send(err);
      }
    }
  } else {
    res.json({ message: "no name or clicks send", success: false });
    res.end();
  }
});

router.post("/update", async function (req, res, next) {
  if (req.body.name && req.body.clicks) {
    const name = req.body.name;
    const clicks = req.body.clicks;
    const user = await userModel.findOne({ name: name }).cursor().next();

    if (user) {
      await user.updateOne({ clicks: clicks });
      await user.save();
      res.json({ message: "Name updated", success: true });
    } else {
      res.json({
        message: "Name cant be updated because it doesn't exist",
        success: false,
      });
    }
  } else {
    res.json({ message: "no name or clicks send", success: false });
    res.end();
  }
});

router.get("/delete", async function (req, res, next) {
  if (req.body.name) {
    const name = req.body.name;

    const user = await userModel.findOne({ name: name });

    if (user) {
      await user.remove();
      res.json({ message: "Name deleted", success: true });
    } else {
      res.json({
        message: "Name cant be deleted because it doesn't exist",
        success: false,
      });
    }
  } else {
    res.json({ message: "no name send", success: false });
    res.end();
  }
});

module.exports = router;
