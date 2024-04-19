//books.js situé dans backend/models/

const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [
    { 
      userId: { type: String, required: true },
      grade: { type: Number, required: true }
    }
  ],
  averageRating: { type: Number, required: true },
});

booksSchema.methods.addRating = async function (userId, rating) {
  this.ratings.push({ userId, grade: rating });

  const totalRatings = this.ratings.length;
  const totalSum = this.ratings.reduce((sum, rating) => sum + rating.grade, 0);
  this.averageRating = totalSum / totalRatings;
  console.log("bookrating", this)
  await this.save();
};

module.exports = mongoose.model('books', booksSchema);