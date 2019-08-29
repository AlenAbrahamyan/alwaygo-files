const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
//ete arden ka petq chi stexci
const FriendshipSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  received: {
    type: Array,
    default: []
  },
  sent: {
    type: Array,
    default: []
  },
  friends: {
    type: Array,
    default: []
  }
});

module.exports = Friendship = mongoose.model('Friendship', FriendshipSchema);