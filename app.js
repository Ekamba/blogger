import express from "express";
import {} from "dotenv/config.js";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRouter from "./routes/user.js";
import path from "path";
import morgan from "morgan";

const app = express();
const __dirname = path.dirname("index.html");

app.use(morgan("dev"));
// parse application/json

app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

const corsOptions = {
  origin: "https://blogger-appli.herokuapp.com/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/posts", postRoutes);
app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, "client", "build")));

const CONNECTION_URL = process.env.URL_CONNECTION;
const PORT = process.env.PORT || 4000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connection to MongoDB established`))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);
