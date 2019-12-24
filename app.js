const express = require("express");
const app = express();
const mongoose = require("mongoose");

const config = require("./src/config/config");
const routes = require("./src/routes/routes");

const port = config.PORT || 3000;

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log("server is running on port: ", port);
});
