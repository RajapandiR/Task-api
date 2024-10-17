import { Request, Response, Responder, Message ,Model, Enum,TaskModel } from "../../helpers/path";

class TaskConduller {
    constructor() { }
    createTask = async (req: Request, res: Response) => {
        const data = req.body;
        let validateErr = Model.validateModel(data, ["title"]);
        if (validateErr)
            return Responder.sendValidationError(validateErr, res);
        const task = await Model.createModel(TaskModel, data);
        if (task.success) Responder.sendSuccessData({ task: task.value }, Message.taskCreated, res);
        else Responder.sendFailureMessage(task.message ?? Message.taskCreated404, res);
    };
    getTasks = async (req: Request, res: Response) => {
        let query = req.query;
        let tasks = await Model.find(TaskModel, query, { _id: 1, title: 1, status: 1, description: 1 }, { sort: { _id: -1 } });
        if (tasks) Responder.sendSuccessData({ tasks: tasks.data, total: tasks.total }, Message.tasks, res);
        else Responder.sendFailureNotFoundMessage(Message.tasks404, res);
    };
    editTask = async (req: Request, res: Response) => {
        try {
            let data = req.body;
            let validateErr = Model.validateModel(data, ["title"]);
            if (validateErr) return Responder.sendValidationError(validateErr, res);
            if (data?.status) {
                let type = Object.values(Enum.TaskStatus);
                if (!type.includes(data.status))
                    return Responder.sendFailureMessage(Message.taskInvalid, res);
            }
            let task = await TaskModel.findOneAndUpdate({ _id: req.params.id }, { $set: data });
            if (task) Responder.sendSuccessMessage(Message.taskUpdated, res);
            else Responder.sendFailureMessage(Message.taskUpdated404, res);
        }
        catch (err) {
            return Responder.sendValidationError(err.message, res);
        }
    };
    getTask = async (req: Request, res: Response) => {
        try {
            let task = await Model.findOne(TaskModel, { _id: req.params.id });
            if (task) Responder.sendSuccessData({ task }, Message.task, res);
            else Responder.sendFailureNotFoundMessage(Message.task404, res);
        }
        catch (err) {
            return Responder.sendValidationError(err.message, res);
        }
    };
    deleteTask = async (req: Request, res: Response) => {
        try {
            let task = await TaskModel.findOneAndDelete({ _id: req.params.id });
            if (task) Responder.sendSuccessMessage(Message.taskDeleted, res);
            else Responder.sendFailureNotFoundMessage(Message.task404, res);
        }
        catch (err) {
            return Responder.sendValidationError(Message.taskUpdated404, res);
        }
    };
}
export const Controller = new TaskConduller();
