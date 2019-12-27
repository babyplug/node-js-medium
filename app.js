const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");

const config = require("./src/config/config");
const routes = require("./src/routes/routes");
const authRoutes = require("./src/routes/secure_routes");

const port = config.PORT || 3000;

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(express.json());

require("./src/config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);
app.use(
  "/api/auth",
  passport.authenticate("jwt", { session: false }),
  authRoutes
);

app.listen(port, () => {
  console.log("server is running on port: ", port);
});
