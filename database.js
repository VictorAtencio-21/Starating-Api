const mongoose = require("mongoose");

MONGO_URI = `mongodb+srv://staratingadmin:staratingpass@clusterstarating.virbt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed");
      console.error(error);
      process.exit(1);
    });
};