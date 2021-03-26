const mongoose = require('mongoose');

// Schema for AddressBook
const kafkaSchema = mongoose.Schema({
    ticketNo: {
     type: Number,
    },
    color: {
     type: String,
    },
    createdAt: { type: Date, default: Date.now },
   })
   //Creating the collection Address
const KafkaScheme = mongoose.model('KafkaScheme', kafkaSchema)

module.exports = KafkaScheme