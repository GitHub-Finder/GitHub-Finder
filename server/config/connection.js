const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/githubusers`,

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const userModel =
  mongoose.models["Users"] || mongoose.model("Users", userSchema);

module.exports = userModel;
