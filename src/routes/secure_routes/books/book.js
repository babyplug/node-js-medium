const express = require("express");
const router = express.Router();

//service
const bookService = require("../../../services/books");

router
  .route("")
  .get(bookService.getAllBooks())
  .post(async (req, res) => {
    return await bookService.createBook(req, res);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    return await bookService.getBookById(req, res);
  })
  .put(async (req, res) => {
    return await bookService.updateBook(req, res);
  })
  .delete(async (req, res) => {
    return await bookService.deleteBook(req, res);
  });

module.exports = router;
