import { crypto } from "../helpers/path";
class Utils {
    constructor() { }

    createHashPwd = (pwd: string) => {        
        return crypto.createHash("md5").update(pwd).digest("hex");
    };
}

export default new Utils();