// const fs = require("fs");
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "taskStocker.json");
const enregistreTask = (task) => {
  let taskStocker = [];
  if (fs.existsSync(filePath)) {
    taskStocker = JSON.parse(fs.readFileSync(filePath));
  }
  task.id = taskStocker.length + 1;
  taskStocker.push(task);
  fs.writeFileSync(filePath, JSON.stringify(taskStocker, null, 2));
};

const makeTask = () => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath));
  } else {
    return [];
  }
};
export { enregistreTask, filePath, makeTask };
