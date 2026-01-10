// Centralized application configuration using environment variables.
// This ensures a single source of truth for config and avoids config.json at runtime.

const NODE_ENV = process.env.NODE_ENV || "development";

const requiredEnv = ["MONGO_URI", "ACCESS_TOKEN_SECRET"];
const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length) {
  // Fail fast if critical configuration is missing so the server does not start in a bad state.
  throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
}

const PORT = Number(process.env.PORT) || 8000;

// Accept a comma-separated list of allowed origins for CORS. In development, default to '*'.
let allowedOrigins;
if (process.env.CORS_ORIGIN) {
  allowedOrigins = process.env.CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean);
} else {
  allowedOrigins = NODE_ENV === "production" ? [] : "*";
}

const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || "60m"; // Reasonable default expiry.

module.exports = {
  nodeEnv: NODE_ENV,
  port: PORT,
  mongoUri: process.env.MONGO_URI,
  mongoDbName: process.env.MONGO_DB_NAME, // Optional, can be undefined.
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenTtl: ACCESS_TOKEN_TTL,
  cors: {
    allowedOrigins,
  },
};
