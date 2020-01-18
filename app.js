const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

// utils
const passportPlugin = require("./src/plugins/passport");

// config and routes
const config = require("./src/config/config");
const routes = require("./src/routes/routes");
const authRoutes = require("./src/routes/secure_routes");

// port
const port = config.PORT || 4000;

// setting static
let publicDir = path.join(__dirname, "/public/images/");

// connect db
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

// setup app
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// declare routes
app.use("/images", express.static(publicDir));
app.use("/api", routes);
app.use(
  "/api/auth",
  passportPlugin.authen,
  express.json({ limit: "50Mb" }),
  authRoutes
);

app.listen(port, () => {
  console.log("server is running on port: ", port);
});

// process.on("uncaughtException", process.exit);
// process.on("SIGTERM", process.kill);
