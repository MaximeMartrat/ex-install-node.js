//déclaration des constantes contenant l' export des modules express et fs
const fs = require('fs');
const express = require('express');
//déclaration d'une constante qui lance une fonction express() qui crée une application express
const app = express();
// On déclare une constante qui contiendra l'export du module body-parser
const bodyParser = require("body-parser");
// Je vais dire à Express d'utiliser bodyParser pour lire le contenue du body en json
app.use(bodyParser.json());

const readFile = require('./src/utils/manipulate');
//const writeFile = require('./src/utils/writefile');
//une route qui va permettre d'afficher les données contenu dans le fichier menu.json en JSON dans la requête
//GET "/menu"
//ex: hhtp://localhost:3100/data
app.get("/:filename/:arrayName", (request, response) => {
    //on utilise la methode du module "fs" pour lire et retourner le contenu du fichier en chaine de caractères
    readFile("./src/model/" + request.params.filename + ".json", response, null, request.params.arrayName);
});

//C'est une route qui me permet de récupérer une data par son id
//GET "/data/:id"
// Ex: http://localhost:3100/data/1
app.get("/:filename/:arrayName/:id", (request, response) => {
    // Je vais utiliser la méthode readFile du module fs pour pouvoir récupérer l'entièreté du fichier
    readFile("./src/model/" + request.params.filename + ".json", response, request.params.id, request.params.arrayName);
});    

// C'est une route qui me permet d'insérer de la données dans mon fichier data.json
// POST "/data"
// Ex: http://localhost:3000/data
app.post("/:filename/:arrayName", (request, response) => {
    // writeFile("./src/model/" + request.params.filename + ".json", response, null, request.params.arrayName);
    // lire le contenu du fichier
    fs.readFile("./src/model/" + request.params.filename + ".json", (err, data) => {
        // si une erreur sur la lecture du fichier
        if (err) {
             response.status(500).json({
             message: "Une erreur est survenue lors de la lecture des données",
             });
        } else {
            // stocker les données existante
            const existingData = JSON.parse(data);
            // rajouter ma donnée à moi
            existingData[request.params.arrayName].push(request.body);
            // je vais reécrire le fichier avec les nouvelles données
            fs.writeFile("./src/model/" + request.params.filename + ".json", JSON.stringify(existingData), (writeErr) => {
                 // si il ya une erreur au moment de l'écriture
                if (writeErr){
                     response.status(500).json({
                     message: "Une erreur est survenue lors de l'écriture des données",
                     });
                } else {
                     response.status(200).json({
                     message: "Les données ont été ajouté avec succès",
                     });
                }
            });
        }
    });
});

//on exporte la constante de l'app pour la rendre disponible dans d'autres partie du code
module.exports = app;