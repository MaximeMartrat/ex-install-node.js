//déclaration des constantes contenant l' export des modules express et fs
const express = require('express');
const fs = require('fs');
//déclaration d'une constante qui lance une fonction express() qui crée une application express
const app = express();
// On déclare une constante qui contiendra l'export du module body-parser
const bodyParser = require("body-parser");
// Je vais dire à Express d'utiliser bodyParser pour lire le contenue du body en json
app.use(bodyParser.json());

//une route qui va permettre d'afficher les données contenu dans le fichier data.json en JSON dans la requête
//GET "/data"
//ex: hhtp://localhost:3100/data
app.get("/:arrayName", (request, response) => {
    //on utilise la methode du module "fs" pour lire et retourner le contenu du fichier en chaine de caractères
    fs.readFile("menu.json", (err, data) => {
        //si dans le callback l'erreur n'est pas null
        if (err) {
            //je renvoi une réponse avec un status 500 (erreur server) et un corps de requêtes contenant un message et l'erreur
            response.status(500).json({
                message: "Une erreur lors de la lecture des données",
                error: err
            });
        } else {
            //sinon on envoi la reponse au status 200 et je renvoie en json la chaine de caractères transformés en JSON
            const jsonData = JSON.parse(data);
            response.status(200).json(jsonData.menu[request.params.arrayName]);
        }
    });
});

//C'est une route qui me permet de récupérer une data par son id
//GET "/data/:id"
// Ex: http://localhost:3100/data/1
app.get("/:arrayName/:id", (request, response) => {
    // Je vais utiliser la méthode readFile du module fs pour pouvoir récupérer l'entièreté du fichier
    fs.readFile("menu.json", (err, data) => {
        // Je met une condition si il y a une erreur dans le callback
        if (err) {
        // Je renvoie une réponse status 500 avec un message et l'erreur
            response.status(500).json({
            message: "Une erreur lors de la lecture des données",
            error: err,
            });
        } else {
            // Je parse la chaine de caractères en Json pour le transformez en JSON manipulable
            const jsonData = JSON.parse(data);
            // Je vais cherchez dans ce fichier si l'id correspondants en paramètres existe dans le contenue
            const dataById = jsonData.menu[request.params.arrayName].find(
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

// C'est une route qui me permet d'insérer de la données dans mon fichier data.json
// POST "/data"
// Ex: http://localhost:3000/data
app.post("/:newArray", (request, response) => {
    // lire le contenu du fichier
    fs.readFile("menu.json", (err, data) => {
        // si une erreur sur la lecture du fichier
        if (err) {
            response.status(500).json({
            message: "Une erreur est survenue lors de la lecture des données",
            });
        } else {
            // stocker les données existante
            const existingData = JSON.parse(data);
            // rajouter ma donnée à moi
            existingData.menu[request.params.newArray].push(request.body);
            // je vais reécrire le fichier avec les nouvelles données
            fs.writeFile("menu.json", JSON.stringify(existingData), (writeErr) => {
                // si il ya une erreur au moment de l'écriture
                if (writeErr){
                    response.status(500).json({
                    message: "Une erreur est survenue lors de l'écriture des données",
                    });
                } else {
                    response.status(200).json({
                    message: "Les données ont été ajouter avec succès",
                    });
                }
            });
        }
    });
});

//on exporte la constante de l'app pour la rendre disponible dans d'autres partie du code
module.exports = app;