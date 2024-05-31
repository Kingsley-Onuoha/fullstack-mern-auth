import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "../routes/user.routes.js";
import authRoute from "../routes/auth.routes.js"

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json())

app.listen(3000, () => {
  console.log("server is running on PORT 3000");
});

// configuring the user router
app.use("/api/user", userRoute);

app.use('/api/auth', authRoute)