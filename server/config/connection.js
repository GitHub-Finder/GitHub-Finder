const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb+srv://rkurbanov:${process.env.PASSWORD}@cluster0.pvqbt1r.mongodb.net/users`,
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
