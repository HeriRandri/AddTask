import express from "express";
import mongoose from "mongoose";
import data from "./task/taskList.mjs";
import cors from "cors";

const app = express();
const port = 3007;
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));
// Middleware to parse JSON
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Remplacez "http://localhost:5173" par l'adresse de votre application React
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const url = "mongodb://localhost:27017/clockEmployer";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const UserSchema = new mongoose.Schema({
  titre: String,
  description: String,
  date: { type: Date, default: Date.now },
});

const listSchema = new mongoose.Schema({
  titre: String,
  description: String,
  date: { type: Date, default: Date.now },
});

const userModel = mongoose.model("list", UserSchema);
const listModel = mongoose.model("user", listSchema);

app.get("/", async (req, res) => {
  const data = await listModel.find({});

  res.send({ succes: true, message: data });
});

app.post("/create", (req, res) => {
  console.log(req.body);
  const data = new listModel(req.body);
  data
    .save()
    .then(() => {
      res.send({ sucess: true, message: "data save successufully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/api/list", (req, res) => {
  userModel
    .find({})
    .then((list) => res.json(list))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/api/data", (req, res) => {
  const currentDate = new Date();
  const filterDate = data.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getFullYear() === currentDate.getFullYear() &&
      itemDate.getMonth() === currentDate.getMonth() &&
      itemDate.getDate() === currentDate.getDate() &&
      itemDate.getHours() === currentDate.getHours() &&
      itemDate.getMinutes() === currentDate.getMinutes()
    );
  });
  res.json(filterDate);
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
