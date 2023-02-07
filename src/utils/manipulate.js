const fs = require("fs");
const express = require("express");
const readFile = (filename, response, id, arrayName) => {
  // On va utiliser la méthode qui vient du module "fs" pour lire et retourner le contenu du fichier en chaine de caractères
  fs.readFile(filename, (err, data) => {
    // Si dans le callback il y a une erreur
    if (err) {
      // Je renvoie une réponse avec un status 500 (erreur server) et un corps de requêtes contenant un message et l'erreur
      response.status(500).json({
        message: "Une erreur lors de la lecture des données",
        error: err,
      })
    } else {
        const jsonData = JSON.parse(data);
      if (id) {
        // Je vais cherchez dans ce fichier si l'id correspondants en paramètres existe dans le contenue
        const dataById = jsonData[arrayName].find((obj) => obj.id === parseInt(id));
        // Si on trouve un objet avec cet id
        if (dataById) {
          // On renvoie une réponse avec un status 200 et l'objet
          response.status(200).json(dataById);
        } else {
          // On renvoie une réponse avec un status 404 avec un message d'erreur
          response.status(404).json({
            message: "Aucun objet trouvé avec cet id",
          })
        }
      } else {
      // Je renvoie une réponse au status 200 et je renvoie en json la chaine de caractères transformez en JSON
      response.status(200).json(jsonData[arrayName]);
      }
    }
  })
};


module.exports = readFile;
