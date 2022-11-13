const express = require("express");
const route = require("./route/route");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://rohit_sonawane:SuperSu@cluster0.e9hjfiy.mongodb.net/projectBlog"
  )
  .then(() => console.log("MongoDb is Connected"))
  .catch((error) => console.log(error));

app.use("/", route);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`);
});
