const { ErrorHandler } = require("../../utils/error");
const HttpStatus = require("http-status-codes");

module.exports = schema => {
  schema.pre("find", function() {
    this.where({ deleted: false }).select("-deleted -__v -createdBy");
  });

  schema.pre("findOne", function() {
    this.where({ deleted: false }).select("-deleted -__v -createdBy");
  });

  schema.post("findOne", function(doc) {
    if (!doc) {
      // throw new Error("Not found");
      throw new ErrorHandler(HttpStatus.NOT_FOUND, "Data not found !");
    }
  });
};
