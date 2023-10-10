const mongoose = require('mongoose');
const utlisateurSchema = mongoose.Schema({
    _id: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    nom: { type: String, required: true },
    username: { type: String, required: true }
    
})
module.exports = mongoose.model('Utlisateur',utlisateurSchema)