const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/github-finder-db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const userModel =
  mongoose.models['Users'] || mongoose.model('Users', userSchema);

module.exports = userModel;
