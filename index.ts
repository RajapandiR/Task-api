import { LoginUserRouter, express, mongoose, Middleware } from "./src/helpers/path"
import cors from "cors";
import "dotenv/config";
import { TaskRouter } from "./src/controllers/task/router";

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT!;

mongoose.connect(process.env.DB_URL!, {}).then(() => console.log("DB Connected")).catch((err) => console.log("err", err));

app.use("/api/users/auth", LoginUserRouter)
app.use("/api/tasks", Middleware.loginMiddleware,TaskRouter )
app.listen(port, () => {
    console.log(`Server running at ${port}`);
})