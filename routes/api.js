var express = require("express");
const userModel = require("../models/data");
var router = express.Router();

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
      res.status(400).send("name not found");
    }
  } else {
    res.status(400).send("no name in request");
    res.end();
  }
});

router.post("/create", async function (req, res, next) {
  if (req.body.name && typeof req.body.clicks === "number") {
    const name = req.body.name;
    const clicks = req.body.clicks;
    const user = await userModel.findOne({ name: name }).cursor().next();

    if (user) {
      res.status(400).send("Name already exists in values");
    } else {
      const new_user = await new userModel({ name, clicks });
      try {
        if (name !== "DO_NOT_REGISTER") {
          await new_user.save();
        }
        res.json({ message: "Name added", success: true });
      } catch (err) {
        res.status(500).send(err);
      }
    }
  } else {
    res.status(400).send("no name or clicks send");
    res.end();
  }
});

router.post("/update", async function (req, res, next) {
  if (req.body.name && typeof req.body.clicks === "number") {
    const name = req.body.name;
    const clicks = req.body.clicks;
    const user = await userModel.findOne({ name: name }).cursor().next();

    if (user) {
      await user.updateOne({ clicks: clicks });
      await user.save();
      res.json({ message: "Name updated", success: true });
    } else {
      res.status(400).send("Name cant be updated because it doesn't exist");
    }
  } else {
    res.status(400).send("no name or clicks send");
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
      res.status(400).json({
        message: "Name cant be deleted because it doesn't exist",
        success: false,
      });
    }
  } else {
    res.status(400).json({ message: "no name send", success: false });
    res.end();
  }
});

module.exports = router;
