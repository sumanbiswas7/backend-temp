const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const statusRoutes = require("./routes/status.routes");
const businessRoutes = require("./routes/business.routes");

const app = express();

// middlewares
dotenv.config();
app.use(cors());
app.use(express.json());

// routes
app.use("/", statusRoutes);
app.use("/business", businessRoutes);

// start server
main();

async function main() {
  const MONGODB_URL = process.env.MONGODB_URL;
  const PORT = process.env.PORT || 4000;

  try {
    if (!MONGODB_URL) throw new Error("No MONGODB_URL found in .env");
    await mongoose.connect(MONGODB_URL);
    console.log(`🍀 MongoDB Connected Successfully`);

    app.listen(PORT, () => {
      console.log(`🚀 Running on http://localhost:${PORT}`);
    });
  } catch (error) {
    throw new Error("main():", error);
  }
}
