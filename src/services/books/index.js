const BookModel = require("../../models/book");
const { handleError, ErrorHandler, HttpStatus } = require("../../utils/error");

const getAllBooks = async (req, res) => {
  try {
    books = await BookModel.getAllBook();
    return res.json({ data: books });
  } catch (error) {
    console.log(error);
  }
};

const validateReq = body => {
  if (!body.title)
    throw new ErrorHandler(HttpStatus.BAD_REQUEST, "Please filled title");
  if (!body.description)
    throw new ErrorHandler(HttpStatus.BAD_REQUEST, "Please filled description");
};

const createBook = async (req, res) => {
  try {
    validateReq(req.body);
    const { title, description } = req.body;
    const newBook = new BookModel({
      author: req.user._id,
      title,
      description,
      createdBy: req.user._id
    });
    data = await BookModel.createBook(newBook);
    return res.status(HttpStatus.CREATED).json({ success: true, data });
  } catch (err) {
    return handleError(err, res);
  }
};

const getBookById = async (req, res) => {
  try {
    return res.json({ data: await BookModel.getById(req.params.id) });
  } catch (err) {
    return handleError(err, res);
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;

    data = await BookModel.updateBook(id, {
      title,
      description,
      updatedBy: req.user._id
    });

    return res.json({ success: true, data });
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    await BookModel.deleteBook(id);
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook
};
