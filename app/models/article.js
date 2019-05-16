const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: { type: String, unique: true, required: true },
  topic: { type: String, required: false },
  thumbnail: { type: String, required: true },
  articleType: { required: true, type: String, enum: ['column', 'interview'] },
  publicationDate: { type: Date, required: true },
  sections: [{}]
});

module.exports = mongoose.model('Articles', articleSchema);
