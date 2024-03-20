import mongoose from "mongoose";
const userName = "subeksha";
const password = encodeURIComponent("123");
const databaseName = "ecommerse";

const dbURL = `mongodb+srv://${userName}:${password}@cluster0.3owaedv.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;
const connectDb = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Db connection established.");
  } catch (error) {
    console.log(error.message);
    console.log("Db connection failed...");
  }
};
export default connectDb;
