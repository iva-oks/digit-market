import mongoose from "mongoose";

// Відслідковує підключення до бази даних.
let isConnToDb = false;

export const mongoDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnToDb) {
    // console.log("MongoDB is connected successfully!");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      dbName: "digit-market",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnToDb = true;

    // console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};
