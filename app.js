//déclaration des constantes contenant l' export des modules express et fs
const express = require('express');
const fs = require('fs');
//déclaration d'une constante qui lance une fonction express() qui crée une application express
const app = express();
//une route qui va permettre d'afficher les données contenu dans le fichier data.json en JSON dans la requête
//GET "/data"
//ex: hhtp://localhost:3100/data
app.get("/data", (request, response) => {
    //on utilise la methode du module "fs" pour lire et retourner le contenu du fichier en chaine de caractères
    fs.readFile("data.json", (err, data) => {
        //si dans le callback l'erreur n'est pas null
        if (err) {
            //je renvoi une réponse avec un status 500 (erreur server) et un corps de requêtes contenant un message et l'erreur
            response.status(500).json({
                message: "Une erreur lors de la lecture des données",
                error: err
            });
        } else {
            //sinon on envoi la reponse au status 200 et je renvoie en json la chaine de caractères transformés en JSON
            response.status(200).json(JSON.parse(data));
        }
    });
});

//C'est une route qui me permet de récupérer une data par son id
//GET "/data/:id"
// Ex: http://localhost:3100/data/1
app.get("/data/:id", (request, response) => {
    // Je vais utiliser la méthode readFile du module fs pour pouvoir récupérer l'entièreté du fichier
    fs.readFile("data.json", (err, data) => {
      // Je met une condition si il y a une erreur dans le callback
      if (err) {
        // Je renvoie une réponse status 500 avec un message et l'erreur
        response.status(500).json({
          message: "Une erreur lors de la lecture des données",
          error: err,
        });
      } else {
        // Je parse la chaine de caractères en Json pour le transformez en JSON manipulable
        const jsonData = JSON.parse(data)
        // Je vais cherchez dans ce fichier si l'id correspondants en paramètres existe dans le contenue
        const dataById = jsonData.data.find(
          (obj) => obj.id === parseInt(request.params.id)
        );
        // Si on trouve un objet avec cet id
        if(dataById) {
          // On renvoie une réponse avec un status 200 et l'objet
          response.status(200).json(dataById);
        } else {
          // On renvoie une réponse avec un status 404 avec un message d'erreur
          response.status(404).json({
            message: "Aucun objet trouvé avec cet id"
          })
        }
      }
    });
  });    

//on exporte la constante de l'app pour la rendre disponible dans d'autres partie du code
module.exports = app;