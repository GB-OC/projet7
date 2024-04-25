//app.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/booksRoutes'); 
const userRoutes = require('./routes/userRoutes');
const path = require('path');


const app = express();

// Middleware 
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(`mongodb+srv://yepyep:${process.env.MONGODB_TOKEN}@cluster0.yc2tilh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour gérer les CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Utilisation des routes pour les livres
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;
