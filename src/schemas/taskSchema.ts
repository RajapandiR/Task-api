
import { Schema, Document, mongoose, ObjectId, Utils, Enum } from "../helpers/path";

interface ITask extends Document {
    title: string,
    description: any,
    status: string

}
let options = {
    versionKey: false,
    timestamps: true
};
const TaskSchema = new mongoose.Schema({
    title: { type: String },
    // title: { type: String, required: [true, 'Title is required'] }, This required
    description: String,
    status: { type: String, enum: [Enum.TaskStatus.PENDING, Enum.TaskStatus.IN_PROGRESS, Enum.TaskStatus.COMPLETED], default: Enum.TaskStatus.PENDING }
}, options);

const TaskModel = mongoose.model("task", TaskSchema);
export {ITask, TaskModel };
