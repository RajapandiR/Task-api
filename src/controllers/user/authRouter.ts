import { express } from "../../helpers/path";
import UserController from "./controller"
const app = express.Router();

app.route("/signup").post(UserController.createUser)
app.route("/login").post(UserController.loginUser)

export const LoginUserRouter = app;