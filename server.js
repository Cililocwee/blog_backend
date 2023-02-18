require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

app.use("/", require("./routes/blogRoute"));
app.use("/comments", require("./routes/commentRoute"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log("Express server listening on port 3001");
});
