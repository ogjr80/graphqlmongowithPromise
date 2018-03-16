const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  id: String,
  title: String,
  body: String
})

module.exports = mongoose.model('Article', articleSchema);
