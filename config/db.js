const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_LOCAL_URL);
    await mongoose.connect(process.env.MONGO_ATLAS_URI);
    console.log(
      `DB Connection SuccessFull ${mongoose.connection.host}`.bgCyan.white
    );
  } catch (error) {
    console.log(`error in connection DB ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
