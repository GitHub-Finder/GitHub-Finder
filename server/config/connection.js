const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://rkurbanov:Lovelyneera321@cluster0.pvqbt1r.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
