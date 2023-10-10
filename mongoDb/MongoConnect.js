//importation de mongoose
const mongoose = require('mongoose')

//importation du fichier dotenv pour la configuration
require('dotenv/config')

const connectDB = async () => {

  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.Mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  //promisse
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => { console.log('Connexion à MongoDB échouée !'), process.exit() });
}

module.exports = connectDB;