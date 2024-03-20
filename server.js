const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const route = require("./routes/userRoutes");
app.use("/api/v1/auth", route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`.bgGreen.white);
});
