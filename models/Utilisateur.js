const mongoose = require('mongoose');

const utilisateurSchema = mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
