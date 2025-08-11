import {Post, Route} from "tsoa";



@Route("/auth")
export class AuthController {
    @Post("GetToken")
    public async getToken(@Body)
}