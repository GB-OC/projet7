//App.js

const express = require('express');
const mongoose = require('mongoose');
const books = require('./models/books');

const app = express();

mongoose.connect('mongodb+srv://yepyep:OXI4JRPrXFknNLwZ@cluster0.yc2tilh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const books = new books({
    ...req.body
  });
  books.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
});


module.exports = app;