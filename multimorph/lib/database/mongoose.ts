
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Each time a Next.js API route is hit, the code runs fresh (serverless by default).
// So you need to prevent reconnecting every time, which can lead to performance issues or errors.
// For this reason we need to use the connection caching pattern


let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("MONGODB_URL is not defined");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "multimorph",
      bufferCommands: false,
    });

    cached.conn = await cached.promise;
    return cached.conn
};
