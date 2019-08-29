const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  profile_img: {
    type: String,
    default: 'https://scontent.fevn5-1.fna.fbcdn.net/v/t1.15752-0/p280x280/67207851_2405263552866851_201701577004679168_n.jpg?_nc_cat=104&_nc_oc=AQnUrHhvklTzdzaD3WLrxYyNmV773kXXXdIHIeahD0d9qPd433ZZLwqKSaRH6gchzpg&_nc_ht=scontent.fevn5-1.fna&oh=0ef592fd425a6ea6ff1d5c64e144bd3d&oe=5DB37A77'
  }
});

module.exports = User = mongoose.model('user', UserSchema);
