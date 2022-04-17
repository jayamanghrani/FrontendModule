import { Response } from './response';

export class LoginResponse extends Response{

    userId:string;
    firstName:string;
    lastName:string;
    uploadFlag: string;
    uploadType: string;
    token: string;
    message: string;
    loggedIn:string;
    status: string;
    channel:string;     //"claimfileupload
    statusMessage:string;
    statusCode:number;
    lastLoginDate: string;
    pRetError: string;
    pRetCode: string;
    systemDate: string





}