const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const NoteSchema = mongoose.Schema({
    _id: { type: String, required: true },
    _idPrestateur: { type: String, required: true },
    _idClient: { type: String, required: true },
    Note: { type: String, required: true },
    
})
module.exports = mongoose.model('Note',NoteSchema)