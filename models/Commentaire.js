const mongoose = require('mongoose');
const commentaireSchema = mongoose.Schema({
    _id: { type: String, required: true },
    id_client: { type: String, required: true },
    id_prestateur: { type: String, required: true },
    commentaire: { type: String, required: true }, 
})
module.exports = mongoose.model('Commentaire',commentaireSchema)