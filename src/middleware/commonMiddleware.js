exports.blogCreation = (req, res, next) => {
  try {
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
    if (!receivedKey.length) {
      next();
    }
    if (receivedKey.length) {
      res
        .status(400)
        .send({ status: "fail", msg: `${receivedKey} field is missing` });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.authorCreation = (req, res, next) => {
  try {
    const fieldAllowed = ["fname", "lname", "title", "email", "password"];
    const data = req.body;
    const keyOf = Object.keys(data);
    const receivedKey = fieldAllowed.filter((x) => !keyOf.includes(x));

    if (!receivedKey.length) {
      console.log("hiiiiii");
      next();
    }
    if (receivedKey.length) {
      console.log("hiiiiii");
      res
        .status(400)
        .send({ status: "fail", msg: `${receivedKey} field is missing` });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
