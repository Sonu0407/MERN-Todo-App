import mongoose from "mongoose";

//try connecting to db
// remember database is in another content
const db_connect = async () => {
  try {
    const response = await mongoose.connect(process.env.DATABASE_URL);
    if (response) {
      console.log("✅ Database connection successfull");
    }
  } catch (error) {
    console.log("❌ Database connection error", error);
  }
};

export default db_connect;
