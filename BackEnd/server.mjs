import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // Add this line

const urlMongodb = "mongodb://localhost:27017/faireTask";

mongoose
  .connect(urlMongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connexion réussie à MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const taskSchema = new mongoose.Schema({
  titre: String,
  description: String,
  date: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

// Read tasks
app.get("/", async (req, res) => {
  const data = await Task.find({});
  res.send({ success: true, data: data, message: "Lecture de la liste" });
});

// Create task
app.post("/create", (req, res) => {
  const data = new Task(req.body);
  console.log(req.body);
  data
    .save()
    .then(() => {
      res.send({
        success: true,
        data: data,
        message: "Tâche créée avec succès",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: "Erreur lors de la création de la tâche",
      });
    });
});

// Update task
app.put("/update", async (req, res) => {
  const { id, ...rest } = req.body;
  const data = await Task.updateOne({ _id: id }, rest);
  res.send({ success: true, data: data, message: "Tâche mise à jour" });
});

// Delete task
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Task.deleteOne({ _id: id });
  res.send({ success: true, data: data, message: "Suppression réussie" });
});

app.listen(2024, () => {
  console.log("Serveur en cours d'exécution sur http://localhost:2024");
});
