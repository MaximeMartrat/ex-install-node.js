//on importe la constante app qui provient du fichier app.js
const app = require('./app');
const port = 3100

//Demande a express d'exposer tout le cotenu enregistré sur le port 3100 du server qui acceuille l'application
app.listen(port, () => {
    //on lancera une chaine de caractères en terminal pour avoir un retour pour être sur que tout fonctionne
    console.log('L\'application tourne sur le port ' + port);
});