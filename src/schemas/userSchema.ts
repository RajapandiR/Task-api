
import { Schema, Document, mongoose, ObjectId, Utils, Enum } from "../helpers/path";

interface IUser extends Document {
    email: string,
    password: any,
    status: string

}
let options = {
    versionKey: false,
    timestamps: true
};
const UserSchema = new mongoose.Schema({
    email: { type: String },
    // title: { type: String, required: [true, 'Title is required'] }, This required
    password: String,
}, options);

const UserModel = mongoose.model("user", UserSchema);
export {IUser, UserModel };
