// Single, centralized MongoDB connection using Mongoose.
// Ensures we do not create duplicate connections and keeps connection logic reusable.

const mongoose = require("mongoose");
const config = require("./config");

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    // Reuse existing connection instead of opening a new one.
    return mongoose.connection;
  }

  const options = {};
  if (config.mongoDbName) {
    options.dbName = config.mongoDbName;
  }

  await mongoose.connect(config.mongoUri, options);
  isConnected = true;

  return mongoose.connection;
}

// Basic connection event logging (use a proper logger in real production deployments).
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

// Graceful shutdown so the process exits cleanly.
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = {
  connectDB,
};
