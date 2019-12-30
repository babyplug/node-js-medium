const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  email: {
    type: String,
    validate: {
      validator: v => {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email`
    },
    required: [true, "User email required !"]
  },
  image: {
    type: String,
    default: ""
  },
  name: {
    type: String
  },
  surname: {
    type: String
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));
