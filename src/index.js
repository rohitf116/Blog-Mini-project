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
const PORT =process.env.PORT || 3000
app.listen(PORT, function () {
  console.log(`Express app running on port ${PORT}`);
});
