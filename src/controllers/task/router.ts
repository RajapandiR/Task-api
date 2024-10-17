import { express } from "../../helpers/path";
import { Controller } from "./controller";

const app = express.Router();

app.get("/", (req, res) => {
   Controller.getTasks(req, res);
});
app.post("/", (req, res) => {
   Controller.createTask(req, res);
});
app.put("/:id", (req, res) => {
   Controller.editTask(req, res);
});
app.get("/:id", (req, res) => {
   Controller.getTask(req, res);
});
app.delete("/:id", (req, res) => {
   Controller.deleteTask(req, res);
});

export  const TaskRouter = app;