const BookModel = require("../../models/book");
const { handleError, ErrorHandler, HttpStatus } = require("../../utils/error");
const paginate = require("express-paginate");

const calSkip = (page, size) => {
  return (page - 1) * size;
};

const calPage = (count, size) => {
  return Math.ceil(count / size);
};

const getAllBooks = () => async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 25;

    const [_results, _count] = await Promise.all([
      BookModel.find()
        .skip(calSkip(page, size))
        .limit(size)
        .exec(),
      BookModel.countDocuments().exec()
    ]);

    return res.json({
      currentPage: page,
      pages: calPage(_count, size),
      currentCount: _results.length,
      totalCount: _count,
      data: _results
    });
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
    // return handleError(err, res);
    // console.log(err);
    // return res.status(500).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;

    if (!title) {
      throw new ErrorHandler(400, "Title is null");
    }
    if (!description) {
      throw new ErrorHandler(400, "Description is null");
    }

    data = await BookModel.updateBook(id, {
      title,
      description,
      updatedBy: req.user._id
    });

    return res.json({ success: true, data });
  } catch (error) {
    return handleError(error, res);
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

// books = await BookModel.getAllBook();
// _page = parseInt(req.query.page) || 1;
// const [_results, _count] = await Promise.all([
//   BookModel.find()
//     .skip(req.skip)
//     .limit(req.query.limit)
//     .exec(),
//   BookModel.countDocuments().exec()
// ]);

// _pages = Math.ceil(_count / req.query.limit);
// _hasNext = paginate.hasNextPages(req)(_page);

// return res.json({
//   currentPage: _page,
//   pages: _pages,
//   currentCount: _results.length,
//   totalCount: _count,
//   data: _results
// });
