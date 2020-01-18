const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestampPlugin = require("../plugins/schema/timestamp");
const middleware = require("../plugins/schema/middleware");

const BookSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId
  },
  updatedBy: {
    type: Schema.Types.ObjectId
  },
  deleted: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ["user", "admin", "super_admin"]
  }
});

BookSchema.plugin(timestampPlugin);
BookSchema.plugin(middleware);

const Book = (module.exports = mongoose.model("Book", BookSchema));

module.exports.createBook = async newBook => {
  return await newBook.save();
};

module.exports.getById = async id => {
  return await Book.findById(id).lean();
};

module.exports.getAllBook = async () => {
  return await Book.find()
    .populate("author", "-password -__v")
    .lean();
};

module.exports.updateBook = async (id, newData) => {
  return await Book.findByIdAndUpdate(id, newData, { new: true }).lean();
};

module.exports.deleteBook = async id => {
  return await Book.findByIdAndUpdate(
    id,
    { deleted: true },
    { new: true }
  ).lean();
};

// module.exports = {
//   getById,
//   createBook,
//   getAllBook,
//   updateBook,
//   deleteBook
// };
