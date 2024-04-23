//booksRoutes.js situé dans backend/routes/

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const booksController = require('../controller/booksController');

router.post('/:id/rating', auth, booksController.addRating)
router.get('/', booksController.getAllBooks);
router.post('/', auth, multer, booksController.createBook);

router.get('/bestrating', booksController.getTopRatedBooks); 
router.get('/:id', booksController.getBookById);
router.put('/:id', auth, multer, booksController.updateBook);
router.delete('/:id', auth, booksController.deleteBook);

module.exports = router;