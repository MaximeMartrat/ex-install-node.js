//création des constantes pour importer les modules express et fs 
const express = require('express');
const fs = require('fs');
const app = express();

//définition de la route pour les données
app.get("/data", (request, response) => {
    //lecture du fichier menu.json en utilisant fs.readFile()
    fs.readFile("menu.json", (err, data) => {
        if (err) {
            //si une erreur se produit lors de la lecture du fichier on envoi une réponse JSON avec le code d'erreur 500
            response.status(500).json({
                message: "Une erreur lors de la lecture des données",
                error: err
            });
        } else {
            //sinon on envoi la reponse parsée en JSON
            response.status(200).json(JSON.parse(data));
        }
    });
});

//Demande au serveur d'ecouter sur le port 4000
app.listen(4000, () => {
    //Affichage d'un message pour confirmer que l'app tourne bien sur le port 4000
    console.log('L\'app tourne sur le port 4000');
});