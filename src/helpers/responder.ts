import { HttpStatus, Response,  } from "./path";

interface ResultWithData {
    success: boolean,
    message: string,
    data: any
}
interface ResultWithMessage {
    success: Boolean,
    message: String,
}

class ResponderClass {
    constructor() { }
    sendFailureMessage = (message: string, res: Response) => {
        let result: ResultWithMessage = {
            success: false,
            message: message,
        };
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(result));
    }

    sendSuccessMessage = (message: string, res: Response) => {
        let result: ResultWithMessage = {
            success: true,
            message: message,
        };
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(result));
    }

    sendSuccessData = (data: any, message: string, res: Response) => {
        let result: ResultWithData = {
            success: true,
            message: message,
            data: data
        };
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(result));
    }

    sendFailureForbiddenMessage = (message: string, res: Response) => {
        let result: ResultWithMessage = {
            success: false,
            message: message,
        };
        res.setHeader('content-type', 'application/json');
        res.status(HttpStatus.FORBIDDEN).end(JSON.stringify(result));
    }

    sendFailureNotFoundMessage = (message: string, res: Response) => {
        let result = {
            success: false,
            message: message,
        };
        res.setHeader('content-type', 'application/json');
        res.status(HttpStatus.NOT_FOUND).end(JSON.stringify(result));
    }

    sendFailureUnAuthMessage = (message: string, res: Response) => {
        let result = {
            success: false,
            message: message,
        };
        res.setHeader('content-type', 'application/json');
        res.status(HttpStatus.UNAUTHORIZED).end(JSON.stringify(result));
    }

    sendFailureCodeMessage = (message: string, code: number, res: Response) => {
        let result: ResultWithMessage = {
            success: false,
            message: message,
        };
        res.setHeader('content-type', 'application/json');
        res.status(code).end(JSON.stringify(result));
    }

    sendPaginateSuccessData = function (data: any, message: string, res: Response, key: string) {
        let result: ResultWithData = {
            success: true,
            message: message,
            data: {
                [key]: data.docs,
                total: data.totalDocs
            }
        };
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(result));
    }

    sendValidationError =  (msg: string, res: Response) =>{
        this.sendFailureCodeMessage(msg, HttpStatus.BAD_REQUEST, res)
    }

}

export const Responder = new ResponderClass();