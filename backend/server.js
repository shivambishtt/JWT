import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/db/dbConnection.js";
import cors from "cors";

dotenv.config({
  path: ".env",
});

const PORT = process.env.PORT || 6000;

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((err, req, res, next) => {
  if (err instanceof apiError) {
    return res.status(err.errStatus || 500).json({
      message: err.errMessage,
      data: err.data || null,
    });
  }

  // Handle other types of errors
  return res.status(500).json({
    message: "Internal Server Error",
  });
});

// secured routes
import userRouter from "./src/routes/user.routes.js";
app.use("/users", userRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is running at port http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(`MONGO DB Connection failed !! ${err}`);
  });
