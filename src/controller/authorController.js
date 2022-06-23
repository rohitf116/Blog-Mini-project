const jwt = require("jsonwebtoken");
const AuthorModel = require("../Model/authorModel");

const authors = async function (req, res) {
  try {
    let data = req.body;
    const {fname,lname,title,email,password} = data
    
      if (!(/[A-Za-z][A-Za-z0-9_]{1,29}$/.test(fname))) {
        return res.status(400).send({ status: false, message: `fname can not be blank` })
      }
      if (!(/[A-Za-z][A-Za-z0-9_]{1,29}/.test(lname))) {
        res.status(400).send({ status: false, message: `lname can not be blank` })
        return
      }

      if (!(title=="Mr") || (title=="Mrs")|| (title=="Mrs")) {
        res.status(400).send({ status: false, message: `title is not valid` })
        return
      }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        res.status(400).send({ status: false, message: `${email} should be a valid email address` })
        return
      }
      if (!(/[A-Za-z][A-Za-z0-9_]{1,29}/.test(password))) {
        res.status(400).send({ status: false, message: `password  can not be empty` })
        return
      }
  
    let saveData = await AuthorModel.create(data);
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
    let email = req.body.emailId;
    let password = req.body.password;
    if(!email) return res.status(404).send({status : false,msg:"email must me present"})
    if(!password) return res.status(404).send({status : false,msg:"password must me present"})

    let user = await AuthorModel.findOne({
      emailId: email,
      password: password,
    });
    if (!user) {
      res.status(404).send({ msg: "User not  found" });
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
      res.send({ status: true, token: token });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.authors = authors;
