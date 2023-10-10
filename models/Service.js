const mongoose = require('mongoose');
const serviceSchema = mongoose.Schema({
    _id: { type: String, required: true },
    Titre: { type: String, required: true },
    Description: { type: String, required: true },
    Catégorie: { type: String, required: true },
    
})
module.exports = mongoose.model('Service',serviceSchema)