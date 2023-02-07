const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser")
const appi = express();
appi.use(bodyParser.json());

const writeFile = (filename, response, arrayName) =>{
    fs.readFile(filename, (err, data) => {
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
          fs.writeFile("./src/model/" + request.params.arrayName + ".json", JSON.stringify(existingData), (writeErr) => {
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
  }

  module.exports = writeFile;