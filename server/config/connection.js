<<<<<<< HEAD
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Github-finder',
=======
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://rkurbanov:Lovelyneera321@cluster0.pvqbt1r.mongodb.net/test",
>>>>>>> 6760c8beaf40fe812bdc4b4de27df848b3775795
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

<<<<<<< HEAD
module.exports = mongoose.connection;
=======
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const userModel =
  mongoose.models["Users"] || mongoose.model("Users", userSchema);

module.exports = userModel;
>>>>>>> 6760c8beaf40fe812bdc4b4de27df848b3775795
