
export class UsernamePasswordRequest {
    static failMessage = "Must supply username and password";
    
    username: string
    password: string
    
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    
    
    static fromRequestBody(body: any): UsernamePasswordRequest {
        const username = body.username;
        const password = body.password;

        if (typeof username !== "string" || typeof password !== "string") {
            throw new Error("Invalid body for UsernamePasswordRequest")
        }
        
        return new UsernamePasswordRequest(username, password);
    }
    
}