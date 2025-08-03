import Redis from "ioredis";

const redis = new Redis({
  // Use env variables. If they are not set up, use default values.
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379"),
});

export default redis;
