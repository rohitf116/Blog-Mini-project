//Author create

exports.authorValidation = async function (req, res, next) {
  try {
    //key validtion
    const fieldAllowed = ["fname", "lname", "title", "email", "password"];
    const data = req.body;
    const keyOf = Object.keys(data);
    const receivedKey = fieldAllowed.filter((x) => !keyOf.includes(x));
    if (receivedKey.length) {
      console.log("hiiiiii");
      return res
        .status(400)
        .send({ status: "fail", msg: `${receivedKey} field is missing` });
    }
    //key-value validation
    const { fname, lname, title, email, password } = data;

    if (!(/[A-Za-z][A-Za-z0-9_]{1,29}$/.test(fname))) {
      return res
        .status(400)
        .send({ status: false, message: `fname can not be blank` });
    }
    if (!(/[A-Za-z][A-Za-z0-9_]{1,29}/.test(lname))) {
      res
        .status(400)
        .send({ status: false, message: `lname can not be blank` });
      return;
    }

    if (!(title == "Mr") || title == "Mrs" || title == "Mrs") {
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
    if (!(/[A-Za-z][A-Za-z0-9_]{1,29}/.test(password))) {
      res
        .status(400)
        .send({ status: false, message: `password  can not be empty` });
      return;
    }

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//blog create

exports.blogValidation = async function (req, res, next) {
  try {
    //key validation
    const fieldAllowed = [
      "title",
      "body",
      "author_Id",
      "tags",
      "category",
      "subcategory",
    ];
    const data = req.body;
    const keyOf = Object.keys(data);
    const receivedKey = fieldAllowed.filter((x) => !keyOf.includes(x));
    console.log(receivedKey)
    if (receivedKey.length) {
      res.status(400).send({ status: "fail", msg: `${receivedKey} field is missing` });
    }
    // console.log(typeof author_Id)
    // console.log(author_Id)

   //key_value validation
    let {title, body, author_Id, tags, category, subcategory} = data

    //title validation
    if (!(/^(?=.{1,50})/.test(title))) {  
      return res
        .status(400)
        .send({ status: false, message: `title  can not be blank` });
    }
    //body validation
    if (!(/^(?=.{1,1000})/.test(body))) { 
      res
        .status(400)
        .send({ status: false, message: `body  can not be blank` });
      return;
    } 
    if(author_Id.length != 24) { //author_Id validation
      res.status(400).send({ status: false, message: `put a valid author_Id` });
      return
    }
    if (!(/^#?[a-zA-Z0-9 ]+/.test(tags))) { //tags validation
      res
        .status(400)
        .send({ status: false, message: `tags  can not be empty` });
      return;
    }
    if (!(/[A-Za-z][A-Za-z0-9_]{1,29}/.test(category))) { //category validation
      res
        .status(400)
        .send({ status: false, message: `category  can not be empty` });
      return;
    }
    if (!(/^#?[a-zA-Z0-9 ]+/.test(subcategory))) { //subcategory validation
      res
        .status(400)
        .send({ status: false, message: `subcategory  can not be empty` });
      return;
    }
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// exports.getBlogValidation = async function(req, res , next){
//   try{
    // key validation
      // let data = req.query
    //   const fieldAllowed = [
    //     "title",
    //     "body",
    //     "author_Id",
    //     "tags",
    //     "category",
    //     "subcategory",
    //   ]
    // const keyOf = Object.keys(data);
    // const receivedKey = fieldAllowed.filter((x) => !keyOf.includes(x));
    // console.log(receivedKey)
    // if (receivedKey.length) {
    //   return res
    //     .status(400)
    //     .send({ status: "fail", msg: `${receivedKey} field is missing` });
    // }
    // key_value validation
//     let {title, body, author_Id, tags, category, subcategory} = data
    

//     if (!(/^(?=.{1,50})/.test(title))) {  //title validation
//       return res
//         .status(400)
//         .send({ status: false, message: `title  can not be blank` });
//     }
//     if (!(/^(?=.{1,1000})/.test(body))) { //body validation
//       res
//         .status(400)
//         .send({ status: false, message: `body  can not be blank` });
//       return;
//     } 
//     if(author_Id.length != 24) { //author_Id validation
//       res.status(400).send({ status: false, message: `put a valid author_Id` });
//       return;
//     }
//     if (!(/^#?[a-zA-Z0-9 ]+/.test(tags))) { //tags validation
//       res
//         .status(400)
//         .send({ status: false, message: `tags  can not be empty` });
//       return;
//     }
//     if (!(/[A-Za-z][A-Za-z0-9_]{1,29}/.test(category))) { //category validation
//       res
//         .status(400)
//         .send({ status: false, message: `category  can not be empty` });
//       return;
//     }
//     if (!(/^#?[a-zA-Z0-9 ]+/.test(subcategory))) { //subcategory validation
//       res
//         .status(400)
//         .send({ status: false, message: `subcategory  can not be empty` });
//       return;
//     }

//     next();
    
//   } catch(err){
//     res.status(500).send(err.message)
//   }
// }

