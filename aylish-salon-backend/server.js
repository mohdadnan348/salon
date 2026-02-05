import dotenv from "dotenv";
import path from "path";
import app from "./app.js";
import connectDB from "./config/db.js";

// 🔥 EXPLICIT ENV LOAD (Windows safe)
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

console.log("ENV CHECK:", {
  mongo: process.env.MONGO_URI,
  cloudinary: process.env.CLOUDINARY_API_KEY,
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
