const express = require('express');
const app = require('./app');

// Définition du port sur lequel le serveur écoutera les connexions
const port = process.env.PORT || 3000;

// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});