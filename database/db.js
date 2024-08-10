import mongoose from "mongoose"; 
import dotenv from "dotenv";
dotenv.config();
const connection = () => {
  try {
    const DB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-rhixgl7-shard-00-00.fce3nu4.mongodb.net:27017,ac-rhixgl7-shard-00-01.fce3nu4.mongodb.net:27017,ac-rhixgl7-shard-00-02.fce3nu4.mongodb.net:27017/?ssl=true&replicaSet=atlas-v50mjd-shard-0&authSource=admin&retryWrites=true&w=majority&appName=GmailClone`;
    mongoose.connect(DB_URI);
    console.log(`DataBase Connected Successfully`);
  } catch (error) {
    console.log("Error While Connecting to The Database", error.message);
  }
};

export default connection;