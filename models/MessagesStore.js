const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
//ete arden ka petq chi stexci
const MessagesStoreSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  messages: {
    type: Array,
    default: []
  }
});

module.exports = MessagesStore = mongoose.model('MessagesStore', MessagesStoreSchema);