import {Body, Controller, Post, Route, SuccessResponse} from "tsoa";
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
    @SuccessResponse("200")
    public async getToken(@Body() body: GetAuthTokenParams): Promise<{token: string}> {
        const verified = await UserAuthService.verifyLogin(body.username, body.password)

        if (!verified) {
            throw new ApiError("Invalid Login", 401, "Invalid login credentials")
        }

        const user = await UserService.getUserByName(body.username);
        if (!user) throw new Error();

        const jwt = await UserAuthService.generateJWT(user.id)
        
        this.setStatus(200);
        return {token: jwt};
        //res.status(200).send(jwt)
    }
    
    @Post("CreateUser")
    @SuccessResponse("201", "Created")
    public async createUser(@Body() body: CreateUserParams): Promise<{created: boolean}> {
        try {
            await UserService.createNewUser(body.username, body.password)
            this.setStatus(201)
            return {created: true};
        } catch(e: unknown) {
            throw new ApiError("Server Error", 500, "Something has gone wrong")
        }
        
    }
}