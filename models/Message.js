const mongoose = require('mongoose');
const MessageSchema = mongoose.Schema({
    _id: { type: String, required: true },
    _idSender: { type: String, required: true },
    _idReceiver: { type: String, required: true },
    SenderName: { type: String, required: true },
    RecerverName: { type: String, required: true },
    MessageSender: { type: String, required: true },
    ReceiverMessage: { type: String, required: true },
    date: { type: date, required: true },
    
})
module.exports = mongoose.model('Message',MessageSchema)