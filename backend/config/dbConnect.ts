import mongoose from "mongoose";

const MONGODB_URI =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URI
    : process.env.DB_LOCAL_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define DB_URI or DB_LOCAL_URI in environment variables"
  );
}

const MONGODB_DB_NAME = "online-repair-service";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB_NAME,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default dbConnect;
