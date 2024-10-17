import mongoose from "mongoose";

class connectDB {
    constructor() { }

    createConnection = () => {
        mongoose.connect(process.env.DB_URL).then(() => console.log("DB Connected")).catch((err) => console.log(err));
        
    };
}

export const dbConnect = new connectDB(); 