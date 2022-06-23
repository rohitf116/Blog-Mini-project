const express = require("express");
const route = require("./route/route");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://Deepak:Deepak9162@cluster0.uylkg.mongodb.net/bloggingproject",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is Connected"))
  .catch((error) => console.log(error));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on  port " + (process.env.PORT || 3000));
});
