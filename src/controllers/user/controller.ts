import { Request, Response, UserModel, Utils, Responder, Message, HttpStatus, JWT } from "../../helpers/path";

class UserController {
    constructor() { }

    createUser = async (req: Request, res: Response) => {
        let data: any = req.body;
        data.password = Utils.createHashPwd(data.password);
        let user = await UserModel.findOne({ email: data.email });
        if (user) return Responder.sendFailureMessage(Message.userExist404, res)
        let userData = await UserModel.create(data);
        if (userData) Responder.sendSuccessMessage(Message.userCreated, res)
        else Responder.sendFailureForbiddenMessage(Message.userCreated404, res)
    }

    loginUser = async (req: Request, res: Response) => {        
        let data = req.body;
        let pwd = Utils.createHashPwd(data.password);
        let user = await UserModel.findOne({ email: data.email, password: pwd });
        if (!user) return Responder.sendFailureUnAuthMessage(Message.invalid, res);
        const token = JWT.issueToken({ userId: user._id });
        Responder.sendSuccessData({token: token }, Message.login, res)
    }
}

export default new UserController();