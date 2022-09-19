require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const diaryRouter = require("./routes/diary");
const userRouter = require("./routes/user");
const authRouter = require("./routes/oauth");
const authMiddleware = require("./utils/authMiddleware");
const transeRouter = require("./routes/papago");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/key");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const dev = process.env.NODE_ENV !== "production";
// const prod = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

// const appConfig = prod
//   ? require("../../AI-Diary-ver2/server/application.prod.json")
//   : require("../../AI-Diary-ver2/server/application.dev.json");

// console.log(appConfig);
// mongoose.connect(config.mongoURI);

// mongoose.connection.on("connected", () => {
//   console.log("DB connect success");
// });

// mongoose.connection.on("error", (err) => {
//   console.log(err);
// });
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((error) => console.log(error));

// auth url 경로 라우팅
app.use("/auth", authRouter);
//posts url 경로 라우팅
app.use("/diary", authMiddleware, diaryRouter);
//user url 경로 라우팅
app.use("/user", userRouter);
//papago url 경로 라우팅
app.use("/translate", transeRouter);

app.listen(port, () => {
  console.log(`server open. port: ${port}`);
});
