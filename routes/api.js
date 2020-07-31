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
    userModel.findOne({ name: name }, async (err, user) => {
      if (err) {
        res.send("error");
        console.log(err);
      }
      if (user && pwCorrect(password, user.password)) {
        try {
          res.json({ user, success: true });
        } catch (err) {
          res.status(500).send(err);
        }
      } else {
        res.status(400).send("name not found");
      }
    });
  } else {
    res.status(400).send("no name in request");
    res.end();
  }
});

router.post("/create", async function (req, res, next) {
  const { name, password, clicks } = req.body;
  if (name && password && typeof clicks === "number") {
    userModel.findOne({ name: name }, (err, user) => {
      if (user) {
        res.status(400).send("Name already exists in values");
      } else {
        const new_user = new userModel({ name, password, clicks });
        try {
          if (name !== "DO_NOT_REGISTER") {
            new_user.save();
          }
          res.json({ message: "Name added", success: true });
        } catch (err) {
          res.status(500).send(err);
        }
      }
    });
  } else {
    res.status(400).send("no name or clicks send");
    res.end();
  }
});

router.post("/update", async function (req, res, next) {
  const { name, clicks, password } = req.body;
  if (name && password && typeof clicks === "number") {
    userModel.findOne({ name: name }, async (err, user) => {
      if (err) throw err;

      if (user && pwCorrect(password, user.password)) {
        await user.updateOne({ password: password, clicks: clicks });
        res.json({ message: "Name updated", success: true });
      } else {
        res.status(400).send("Name cant be updated because it doesn't exist");
      }
    });
  } else {
    res.status(400).send("no name or clicks send");
    res.end();
  }
});

router.post("/delete", async function (req, res, next) {
  const { name, password } = req.body;
  if (name && password) {
    userModel.findOne({ name: name }, (err, user) => {
      if (err) console.log(err);
      if (user && pwCorrect(password, user.password)) {
        user.remove();
        res.json({ message: "Name deleted", success: true });
      } else {
        res.status(400).json({
          message: "Name cant be deleted because it doesn't exist",
          success: false,
        });
      }
    });
  } else {
    res.status(400).json({ message: "no name send", success: false });
    res.end();
  }
});

router.post("/scoreboard", async function (req, res, next) {
  const users = userModel.find({}).limit(10);
  users.select("name clicks");
  users.sort("-clicks");

  const scores = await users.exec();

  res.status(200).json({ scores: scores, success: true });
  res.end();
});

module.exports = router;
