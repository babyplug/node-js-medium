const passport = require("passport");

// setup passport
require("../../config/passport")(passport);

module.exports = {
  authen: passport.authenticate("jwt", { session: false })
};
