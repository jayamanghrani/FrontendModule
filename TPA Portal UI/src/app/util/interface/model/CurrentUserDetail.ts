export class CurrentUserDetail { 

    public header: {};
    userId:any;
    firstname:any;
    lastname:any;
    uploadFlag: any;
    uploadType: any;
    token: any;
    message: any;
    loggedIn:any;

    constructor(private data : any){
        this.header = data.header;
        this.userId = data.userId;
        this.firstname = data.firstName;
        this.lastname = data.lastName;
        this.uploadFlag = data.uploadFlag;
        this.uploadType =data.uploadType;
        this.token= data.token;
    }
    
    
}