//booksController.js situé dans backend/controller/

const books = require('../models/books');

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  console.log(bookObject);
  delete bookObject._id;
  delete bookObject._userId;

  const book = new books({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : bookObject.imageUrl,
  });
  book.save()
    .then(() => res.status(201).json({ message: 'Livre créé avec succès' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
    books.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
};

exports.getBookById = (req, res, next) => {
    books.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
};

exports.updateBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;
    books.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                books.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Livre modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteBook = (req, res, next) => {
    books.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Livre supprimé avec succès' }))
      .catch(error => res.status(400).json({ error }));
};


exports.getTopRatedBooks = (req, res, next) => {
  books.find()
      .sort({ averageRating: -1 })
      .limit(3)
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
};

exports.addRating = async (req, res) => {
  try {
    const { rating, userId } = req.body;
    const bookId = req.params.id;

    const book = await books.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé." });
    }

    // Utilisation de la méthode addRating du modèle Book
    await book.addRating(userId, rating);

    res.status(201).json(book);
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout de l'évaluation." });
  }
};