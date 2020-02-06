const express = require("express");
const router = express.Router();

//service
const bookService = require("../../../services/books");

router
  .route("")
  .get(bookService.getAllBooks())
  .post(bookService.createBook());

router
  .route("/:id")
  .get(bookService.getBookById())
  .put(bookService.updateBook())
  .delete(bookService.deleteBook());

module.exports = router;
