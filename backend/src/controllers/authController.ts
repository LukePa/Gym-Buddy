import {Body, Controller, Post, Route} from "tsoa";
import {CreateUserParams, GetAuthTokenParams} from "../models/requests/auth";
import * as UserAuthService from "../services/userAuthService";
import * as UserService from "../services/userService";


export class ApiError extends Error {
    statusCode: number;
    constructor(name: string, statusCode: number, message?: string) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}



@Route("/auth")
export class AuthController extends Controller {
    @Post("GetToken")
    public async getToken(@Body() body: GetAuthTokenParams): Promise<string> {
        const verified = await UserAuthService.verifyLogin(body.username, body.password)

        if (!verified) {
            //res.status(401).send({error: "Invalid username or password"});
            throw new ApiError("Invalid Login", 400, "Invalid login credentials")
        }

        const user = await UserService.getUserByName(body.username);
        if (!user) throw new Error();

        const jwt = await UserAuthService.generateJWT(user.id)
        return jwt;
        //res.status(200).send(jwt)
    }
    
    @Post("CreateUser")
    public async createUser(@Body() body: CreateUserParams): Promise<void> {
        await UserService.createNewUser(body.username, body.password)
    }
}