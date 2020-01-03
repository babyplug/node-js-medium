module.exports = schema => {
  schema.add({
    createdDate: Date,
    updatedDate: Date
  });

  schema.pre("save", function(next) {
    const now = Date.now();

    this.updatedDate = now;
    if (!this.createdDate) {
      this.createdDate = now;
    }

    return next();
  });
};
