const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/albumlist",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log("error: ", err));

mongoose.Promise = global.Promise;

module.exports = mongoose;
