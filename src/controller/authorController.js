const jwt = require("jsonwebtoken");
const AuthorModel = require("../Model/authorModel");

exports.createAuthors = async function (req, res) {
  try {
    //key validtion
    const fieldAllowed = ["fname", "lname", "title", "email", "password"];
    const data = req.body;
    const keyOf = Object.keys(data);
    const receivedKey = fieldAllowed.filter((x) => !keyOf.includes(x));
    if (receivedKey.length) {
      return res
        .status(400)
        .send({ status: "fail", msg: `${receivedKey} field is missing` });
    }
    //key-value validation
    const { fname, lname, title, email, password } = data;

    if (!(/^[A-Za-z]{1,29}$/.test(fname))) {
      return res
        .status(400)
        .send({ status: false, message: `fname is invalid or blank` });
    }
    if (!(/^[A-Za-z]{1,29}$/.test(lname))) {
      res
        .status(400)
        .send({ status: false, message: `lname can not be blank` });
      return;
    }

    if (!(title == "Mr" || title == "Mrs" || title == "Miss")) {
      res.status(400).send({ status: false, message: `title is not valid` });
      return;
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      res.status(400).send({
        status: false,
        message: `${email} should be a valid email address`,
      });
      return;
    }
    let presentEmail = await AuthorModel.findOne({ email: email });
    if (presentEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "this emailid is already used" });
    }
    if (!(/[A-Za-z][A-Za-z0-9_@#]{1,29}/.test(password))) {
      res
        .status(400)
        .send({ status: false, message: `password  can not be empty` });
      return;
    }
    let saveData = await AuthorModel.create({ fname, lname, title, email, password });
    res.status(201).send({
      status: true,
      msg: saveData,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.loginUser = async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;

    if (!email)
      return res
        .status(400)
        .send({ status: false, msg: "email must me present" });
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      res.status(400).send({
        status: false,
        message: `email should be a valid email address`,
      });
      return;
    }
    if (!password)
      return res
        .status(400)
        .send({ status: false, msg: "password must me present" });

    let user = await AuthorModel.findOne({
      email: email,
      password: password,
    });
    if (!user) {
      res.status(400).send({ msg: "User not  found" });
    } else {
      let token = jwt.sign(
        {
          userId: user._id.toString(),
          batch: "Room-24",
          organisation: "BlogProject",
        },
        "functionup-radon"
      );
      res.setHeader("x-api-key", token);
      res.status(200).send({ status: true, token: token });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
