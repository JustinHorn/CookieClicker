var express = require("express");
const userModel = require("../models/data");
const bcrypt = require("bcrypt");

var router = express.Router();

function pwCorrect(pw_body, pw_data) {
  return pw_body === pw_data || bcrypt.compareSync(pw_body, pw_data);
}

/* GET users listing. */
router.post("/get", async function (req, res, next) {
  if (req.body.name && req.body.password) {
    const name = req.body.name;
    const password = req.body.password;
    const user = await userModel.findOne({ name: name }).cursor().next();
    if (user && pwCorrect(password, user.password)) {
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
  const { name, password, clicks } = req.body;
  if (name && password && typeof clicks === "number") {
    const user = await userModel.findOne({ name: name }).cursor().next();

    if (user) {
      res.status(400).send("Name already exists in values");
    } else {
      const new_user = await new userModel({ name, password, clicks });
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
  const { name, clicks, password } = req.body;
  if (name && password && typeof clicks === "number") {
    const user = await userModel.findOne({ name: name }).cursor().next();

    if (user && pwCorrect(password, user.password)) {
      await user.updateOne({ password: password, clicks: clicks });
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
  const { name, password } = req.body;
  if (name && password) {
    const user = await userModel.findOne({ name: name });

    if (user && pwCorrect(password, user.password)) {
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
